import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import HomePageLayout from "./HomePageLayout";
import "semantic-ui-css/semantic.min.css";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, Observable } from "apollo-link";
import gql from "graphql-tag";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "@apollo/react-common";

import { render } from "react-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { createUploadLink } from "apollo-upload-client";

import whyDidYouRender from "@welldone-software/why-did-you-render";

const PORT_GRAPHQL_SERVER = 8001;
const SERVER = "51.158.122.16";
// const URI_GRAPHQL_SERVER = `http://${SERVER}:${PORT_GRAPHQL_SERVER}/graphql`;

const URI_GRAPHQL_SERVER = "https://u6tby.sse.codesandbox.io/graphql";

const AUTH_TOKEN = "auth_token";
const REFRESH_TOKEN = "refresh_token";
const SUB = "sub";

// const rootElement = document.getElementById("root");
// ReactDOM.render(<HomePageLayout />, rootElement);

const client2 = new ApolloClient({
  link: new HttpLink({
    uri: URI_GRAPHQL_SERVER
  }),
  cache: new InMemoryCache()
});

const QUERY = gql`
  mutation refreshtoken($sub: String, $refreshToken: String) {
    refreshToken(sub: $sub, refreshtoken: $refreshToken) {
      name
      sub
      token
      iat
      refreshToken
    }
  }
`;

const refreshToken = async (sub, refreshtoken, client2) => {
  const variables = {
    sub: sub,
    refreshToken: refreshtoken
  };
  const response = await client2.mutate({ mutation: QUERY, variables });
  return response;
};

// link: createUploadLink({ uri: process.env.API_URI })

const terminatingLink = new createUploadLink({
  uri: URI_GRAPHQL_SERVER
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      console.log("GraphQLError:");
      console.log(graphQLErrors[0]);
      console.log(" // GraphQLError //");
    }

    if (networkError) {
      console.log("NetworkError:");
      console.log(networkError.statusCode);
      console.log(" // NetworkError //");

      if (networkError.statusCode === 401) {
        localStorage.setItem(AUTH_TOKEN, "");

        return new Observable(observer => {
          refreshToken(
            localStorage.getItem(SUB),
            localStorage.getItem(REFRESH_TOKEN),
            client2
          )
            .then(refreshResponse => {
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  // Re-add old headers
                  ...headers,
                  // Switch out old access token for new one
                  authorization:
                    `Bearer ${refreshResponse.data.refreshToken.token}` || null
                }
              }));
              localStorage.setItem(
                AUTH_TOKEN,
                refreshResponse.data.refreshToken.token
              );
            })
            .then(() => {
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer)
              };

              // Retry last failed request
              forward(operation).subscribe(subscriber);
            })
            .catch(error => {
              // No refresh or client token available, we force user to login
              observer.error(error);
              //signOut();
            });
        });
      }
    }
  }
);

//const link = ApolloLink.from([new LogLink(),authLink,errorLink,terminatingLink]);
const link = ApolloLink.from([authLink, errorLink, terminatingLink]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

const alertOptions = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE
};

whyDidYouRender(React, {
  logOnDifferentValues: true,
  trackAllPureComponents: true
});

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...alertOptions}>
    <ApolloProvider client={client}>
      <HomePageLayout />
    </ApolloProvider>
  </AlertProvider>,
  document.getElementById("root")
);
