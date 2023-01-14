export default query = {
    todos :(parent, _,  { user }, info) => {
        // Fetch the todos from a database or API
        return [{ id: '1', text: 'Learn GraphQL', completed: true }];
      }
}