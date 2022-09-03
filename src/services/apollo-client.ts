import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.react-finland.fi/graphql',
});

export { apolloClient };
