import { gql } from "@apollo/client";

// Due to limitation of sample Graphql server, we cannot get distinct queries of dimensions and also can have only 20 items per request
export const GET_DIMENSIONS = gql`
    query GetLocations {
        first: locations {
            results {
                dimension,
            }
        }
        second: locations (page: 2) {
            results {
                dimension,
            }
        },
        third: locations (page: 3) {
            results {
                dimension,
            }
        }
    }
`

export const GET_LOCATIONS_BY_DIMENSION = gql`
    query GetCharactersByLocation($dimension: String!) {
        locations(filter: { dimension: $dimension }) {
            results {
                id,
                name,
                type,
                residents {
                    name,
                    species,
                    image,
                    gender,
                }
            }
        }
    }
`;

export const GET_EPISODES = gql`
    query GetEpisodes ($page: Int) {
        episodes (page: $page) {
            info {
                pages,
                count,
                next,
                prev,
            },
            results {
                id, name, air_date, episode,
            }
        }
    }
`

export const SET_TODO = gql`
    mutation CreaeTodo ($title: String!, $completed: Boolean!) {
        createTodo (input: { title: $title, completed: $completed }) {
            id, title, completed
        }
    }
`;
