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
    console.log("BASE URL: ", process.env.NEXT_PUBLIC_API_URL);
    const httpLink = createHttpLink({
      uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
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
