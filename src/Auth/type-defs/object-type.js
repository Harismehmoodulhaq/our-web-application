 import { gql } from "apollo-server-express";

// Define the Todo type
export default objectType = gql`
  type LoginResponse {
    token: String!
  }
  type SignupResponse {
    token: String!
  }
`;