import { ApolloClient, gql, HttpLink, InMemoryCache, makeVar, split } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { getMainDefinition } from "@apollo/client/utilities";

export * from './queries.js';

// @todo Remove from PROD.
loadDevMessages();
loadErrorMessages();

export const selectedDimensionVar = makeVar(null);

// Normally we don't need multiple HttpLink from Apollo, however for the multiple endpoints we can link those by various criteria.

const queryLink = new HttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

const mutationLink = new HttpLink({
  uri: 'https://graphqlzero.almansi.me/api',
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'mutation';
  },
  mutationLink,
  queryLink
);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          selectedLocation: {
            read () {
              return selectedDimensionVar();
            }
          }
        }
      }
    }
  })
});



