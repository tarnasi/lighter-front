'use client'

import React, { ReactNode } from 'react';
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'


export default function ApolloWrapper({ children }: { children: ReactNode }) {
    const httpLink = createHttpLink({
        uri: "http://localhost:4000/graphql"
    });

    const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
      },
    };
  });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    })

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}