import { Resolver, Mutation, Arg, Query } from 'type-graphql';

import { Todo } from "../types/todo";
import { todos} from '../../db/todo-data'

@Resolver()
export class MutationResolver {
    private todos: Todo[] = [
        { id: '1', text: 'Todo 1', completed: false },
        { id: '2', text: 'Todo 2', completed: true },
      ];
    
  @Mutation(returns => Todo)
  addTodo(@Arg('text') text: string) {
    const todo: Todo = {
      id: (todos.length + 1).toString(),
      text,
      completed: false,
    };
    this.todos.push(todo);
    return todo;
  }

  @Mutation(returns => Todo)
  updateTodo(
    @Arg('id') id: string,
    @Arg('text', { nullable: true }) text?: string,
    @Arg('completed', { nullable: true }) completed?: boolean,
  ) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    const todo = { ...this.todos[todoIndex] };
    if (text) {
      todo.text = text;
    }
    if (completed !== undefined) {
      todo.completed = completed;
    }
    this.todos[todoIndex] = todo;
    return todo;
  }

  @Mutation(returns => Boolean)
  deleteTodo(@Arg('id') id: string) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    this.todos.splice(todoIndex, 1);
    return true;
  }

}