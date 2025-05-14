"use client";

import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

export default function ApolloWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    console.log("accessToken (client): ", token);

    const httpLink = createHttpLink({
      // uri: "http://192.168.70.25:4000/graphql",
      uri: "http://10.200.253.66:4000/graphql",
    });

    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    }));

    const apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    setClient(apolloClient);
  }, []);

  if (!client) return null; // یا لودر بذار

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
