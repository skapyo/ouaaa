import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import fetch from "isomorphic-unfetch"
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
    }).then((response) => {
      return response
    })

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
     // uri: "http://localhost:8080/api/graphql", // Server URL (must be absolute)
       uri: 'https://api.app.acteursdelatransition.fr/api/graphql', // Server URL (must be absolute)
      credentials: "include", // Additional fetch() options like `credentials` or `headers`
      fetch: ctx ? enchancedFetch : fetch,
    }),
    // link:new SchemaLink({schema}),
    cache: new InMemoryCache().restore(initialState),
  })
}
