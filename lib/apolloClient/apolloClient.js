import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import fetch from 'isomorphic-unfetch';
import { createUploadLink } from 'apollo-upload-client';
// import { SchemaLink } from 'apollo-link-schema';
// import {schema} from 'lib/server/apolloServer/schema'

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.

  const enchancedFetch = (url, init) =>
    fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        Cookie: ctx.req.headers.cookie,
      },
    }).then((response) => response);

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: createUploadLink({
      uri: process.env.NEXT_PUBLIC_API_URI,
      credentials: 'include', // Additional fetch() options like `credentials` or `headers`
      fetch: ctx ? enchancedFetch : fetch,
    }),
    fetchOptions: {
      mode: 'no-cors',
    },
    // link:new SchemaLink({schema}),
    cache: new InMemoryCache().restore(initialState),
  });
}
