import React from "react";
import App from "./App";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "@apollo/client/link/context";

const httpLink = new createHttpLink({
  uri: "https://social-media-website-cheer.vercel.app/",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
