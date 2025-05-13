"use client";

import React, { ReactNode } from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  const token = Cookies.get("accessToken");
  const httpLink = createHttpLink({
    uri: "http://10.200.253.66:4000/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
