import { gql } from "apollo-server-express";

// Define the Todo type
export default mutationType = gql`
  type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: ID!): Todo
  }
`;