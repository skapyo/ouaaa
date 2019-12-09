import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import HomePageLayout from "./HomePageLayout";
import "semantic-ui-css/semantic.min.css";

import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink ,Observable } from 'apollo-link';
import gql from 'graphql-tag';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from '@apollo/react-common';


const PORT_GRAPHQL_SERVER = 8001;
const SERVER = 'localhost';
const URI_GRAPHQL_SERVER = `http://${SERVER}:${PORT_GRAPHQL_SERVER}/graphql`;

const AUTH_TOKEN = 'auth_token';
const REFRESH_TOKEN = 'refresh_token';
const SUB = 'sub';

// const rootElement = document.getElementById("root");
// ReactDOM.render(<HomePageLayout />, rootElement);

const client2 = new ApolloClient({
    link: new HttpLink({
      uri: URI_GRAPHQL_SERVER,
    }),
    cache: new InMemoryCache() 
  });
    
  const QUERY = gql`
    mutation refreshtoken($sub:String, $refreshToken:String) {
      refreshToken(sub:$sub, refreshtoken:$refreshToken){ 
        name, 
        sub,
        token,
        iat,
        refreshToken
      }
    }
  `;
  
  const refreshToken = async ( sub, refreshtoken,client2) => {
    const variables = {
      sub: sub,
      refreshToken: refreshtoken
    }
    const response = await client2.mutate({mutation:QUERY,variables})
    return(response);
  }
  
  
  const terminatingLink = new HttpLink({
      uri: URI_GRAPHQL_SERVER,
    });
  
  
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })
  
  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  
    if (networkError) {
      if(networkError.statusCode === 401) {
        
        localStorage.setItem(AUTH_TOKEN, '');
  
        return new Observable(observer => {
          refreshToken(localStorage.getItem(SUB),localStorage.getItem(REFRESH_TOKEN),client2)
            .then(refreshResponse => {
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  // Re-add old headers
                  ...headers,
                  // Switch out old access token for new one
                  authorization: `Bearer ${refreshResponse.data.refreshToken.token}` || null,
                }
                
              }))
              localStorage.setItem(AUTH_TOKEN,refreshResponse.data.refreshToken.token);
            })
            .then(() => {
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer)
              }
  
              // Retry last failed request
              forward(operation).subscribe(subscriber)
            })
            .catch(error => {
              // No refresh or client token available, we force user to login
              observer.error(error);
              //signOut();
  
            })
        })
      }
    }
  });
  
  //const link = ApolloLink.from([new LogLink(),authLink,errorLink,terminatingLink]);
  const link = ApolloLink.from([authLink,errorLink,terminatingLink]);
  
  const client = new ApolloClient({
      link: link,
      cache: new InMemoryCache() 
  });
  
  ReactDOM.render(
      <ApolloProvider client={client}>
            <HomePageLayout />
      </ApolloProvider>,
      document.getElementById('root'),
    );