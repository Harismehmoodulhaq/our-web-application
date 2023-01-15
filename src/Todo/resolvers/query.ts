import { Resolver, Mutation, Arg, Query } from 'type-graphql';

import { Todo } from "../types/todo";


@Resolver()
export class QueryResolver {
    @Query(returns => [Todo])
    todos() {
      return this.todos;
    }
} 
