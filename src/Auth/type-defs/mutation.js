import { gql } from "apollo-server-express";

// Define the Todo type
export default mutationType = gql`
  type Mutation {
    login(email: String!, password:String!): LoginResponse
    signUp(email: String!, password:String!):SignupResponse
  }

`;