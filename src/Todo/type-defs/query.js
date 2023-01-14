import { gql } from "apollo-server-express";

// Define the Todo type
export default queryType = gql`
  type Query {
    todos: [Todo]
  }
`;