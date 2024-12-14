import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

  loadDevMessages();
  loadErrorMessages();

export const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export const GET_LOCATIONS = gql`
    query GetLocations {
      locations {
        results {
          name,
          id,
        }
      }
  }
`
