import Express from 'express';
import 'reflect-metadata';
import { buildSchema, NextFn, ResolverData } from 'type-graphql';
// import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { MutationResolver } from './Todo/resolvers/mutation';
import { QueryResolver } from './Todo/resolvers/query';
import * as dotenv from 'dotenv';
import { getUser } from './Auth/resolvers/jwt-auth';
import jwt, { verify } from 'jsonwebtoken';
import { Response, Request } from 'express';
import { ApolloServer } from 'apollo-server';
interface Context  {
  res: Response;

  req: {userId:number} &  Request
} 

dotenv.config();
const SECRET = 'secretkey';

const main = async () => {2
  const schema = await buildSchema({
    resolvers: [
      MutationResolver,
      QueryResolver,
    ],
    globalMiddlewares: [async ( allArgs: ResolverData<Context>, next: NextFn) => {
      const {context:{req, res}, args} = allArgs
      const authorization = req.headers['authorization'];
       
      
      if (!authorization) {
        throw Error('user is not authorized')
      const result = await next();
       
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
      
    }],
    // authChecker: ,
    emitSchemaFile: true,
    validate: false,
  });



  const server = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      // get the user token from the headers
      const user = await getUser(req);
      return { user, req, res };
    },
  });
 
  // const app = Express();

// middleware to check if user is authenticated
  // app.use(async (req: any, res: any, next: any) => {
  //   const token = req.headers.authorization;
  //   if (token) {
  //     try {
  //       req.user = await jwt.verify(token, SECRET);
  //     } catch (e) {
  //       throw new Error('Session expired');
  //     }
  //   }
  //   next();
  // });

  // await server.start(); //start the GraphQL server.
  // server.applyMiddleware();
  
  await server.listen(process.env.PORT);
  console.log(`🚀 Server ready and listening at ==> http://localhost:3000/graphql`)
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