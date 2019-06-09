import gql from "graphql-tag";

export const GET_AUTH_DATA = gql`
  {
    auth @client {
       accessToken 
    }
  }
`;

export const GET_BOOKS_QUERY = gql`
    {
      books{
        id
        title
        author {
          firstName
          lastName
        }
      } 
    }
`;