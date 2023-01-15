import Express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer, ServerRegistration } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { MutationResolver } from './src/Todo/resolvers/mutation';
import { QueryResolver } from './src/Todo/resolvers/query';
import * as dotenv from 'dotenv';
import { getUser } from './src/Auth/resolvers/jwt-auth';
import jwt, { verify } from 'jsonwebtoken';


dotenv.config();
const SECRET = 'secretkey';

const main = async () => {2
  const schema = await buildSchema({
    resolvers: [
      MutationResolver,
      QueryResolver,
    ],
    
    authChecker: ({ context: { req } }) => {
      const authorization = req.headers['authorization'];
      if (!authorization) {
        return false;
      }
      try {
        const token = authorization.split(' ')[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        req.userId = (payload as any).userId;
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    emitSchemaFile: true,
    validate: false,
  });



  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      // get the user token from the headers
      const user = await getUser(req);
      return { user };
    },
    plugins: [ ApolloServerPluginLandingPageGraphQLPlayground ],
  });

  const app = Express();

// middleware to check if user is authenticated
  app.use(async (req: any, res: any, next: any) => {
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

  await server.start(); //start the GraphQL server.
  server.applyMiddleware({ app } as unknown as  ServerRegistration);
  
  app.listen(process.env.PORT, () => {
    `🚀 Server ready and listening at ==> http://localhost:4000/graphql`
});
};

main().catch((error) => {
  console.log(error, 'error');
});

// ` type Book {
//   name:String!
//   id:ID
// }
// type User {

//   name:String!
//   id:ID
//   books: [Book!]!
// }

// type Query {
//   getUser(id:ID!):User
// }

// `