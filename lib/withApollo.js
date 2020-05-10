import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import config from "../src/config.json";





const URI_GRAPHQL_SERVER = `${config.API_SERVER.HTTP}://${config.API_SERVER.URL}/graphql`;

export default withApollo(
    ({ initialState }) => {
        return new ApolloClient({
            uri: URI_GRAPHQL_SERVER,
            cache: new InMemoryCache().restore(initialState || {})
        });
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            );
        }
    }
);