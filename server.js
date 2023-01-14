import express from "express";
import { ApolloServer } from "apollo-server-express";
import todoTypeDefs from "./src/Todo/type-defs";
import { merge } from 'merge-graphql-schemas';
import todoTypeDefs from './src/Todo/type-defs';
import todoResolvers from './src/Todo/resolvers'
import {getUserInfoFromAuthToken} from './src/utils/utils'

const typeDefs = merge([...todoTypeDefs]); //these are routes in Express js server
const resolvers = { Query: { ...todoResolvers.Query }, Mutation: { ...todoResolvers.Mutation } } // These are  controllers in Express js Server


// Create an express app
const app = express();

// Create the GraphQL server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        // get the user token from the headers
        // const user = await getUserInfoFromAuthToken(req);
        // return { user }
        return {test:'Hello'};
    }, 
    playground: true,
});

// middleware to check if user is authenticated
app.use(async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      try {
        req.user = await jwt.verify(token, SECRET);
      } catch (e) {
        throw new Error('Session expired');
      }
    }
    next();
  });
  
// Apply the GraphQL server to the express app
apolloServer.applyMiddleware({ app });

// Start the express app
app.listen(4000, () => {
    console.log(`Server started on http://localhost:4000/graphql`);
});
