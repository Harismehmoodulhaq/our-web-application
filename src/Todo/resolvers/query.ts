import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';
import { Todo } from '../types/todo';
import { todos } from "../../db/todo-data";


@Resolver()
export class QueryResolver {
    @Query(returns => [Todo /*return TypeDef */])// typedef
    todos(@Arg('id') id: String ,@Ctx() context : any ) {
      console.log(id)
      return todos;
    }
} 
