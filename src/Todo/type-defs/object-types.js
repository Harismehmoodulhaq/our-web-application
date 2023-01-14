import { gql } from "apollo-server-express";

// Define the Todo type
export default objectType = gql`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }
`;