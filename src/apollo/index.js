import { ApolloClient, gql, InMemoryCache, makeVar } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

export * from './queries.js';

// @todo Remove from PROD.
loadDevMessages();
loadErrorMessages();

export const selectedLocationVar = makeVar(null);

export const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          selectedLocation: {
            read () {
              return selectedLocationVar();
            }
          }
        }
      }
    }
  })
});



