import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType() // resonse type as compared to graphql typeDefs
export class Todo {
  @Field(type => ID)
  id!: string ;

  @Field(() => String)
  text!: string;

  @Field({ nullable: true })
  completed?: boolean;
}
