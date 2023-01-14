export default mutation = {
    addTodo: (_, { text },  { user }) => {
        // Add a new todo to the database or API
        const todo = { id: '2', text, completed: false };
        return todo;
      },
      toggleTodo: (_, { id },  { user }) => {
        // Update the completed status of a todo in the database or API
        const todo = { id: '1', text: 'Learn GraphQL', completed: true };
        todo.completed = !todo.completed;
        return todo;
      },
}