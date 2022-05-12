import React from 'react';
import App from './App';
import { ApolloClient } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const httpLink = new createHttpLink({
    uri: "http://localhost:5000"
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export default(
    <ApolloProvider client={ client }>
        <App />
    </ApolloProvider>
)