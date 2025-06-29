const users = [
  { id: '1', name: 'Alice', age: 30, isWeeb: true },
  { id: '2', name: 'Bob', age: 25, isWeeb: false },
  { id: '3', name: 'Charlie', age: 28, isWeeb: true },
];

const resolver = {
  Query: {
    hello: () => 'Hello world!',
    getUsers: () => { 
      return users;
    },
    getUserById: (parent, args) => {
      const id = args.id;
      return users.find(user => user.id === id);
    }
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, age, isWeeb } = args;
      const newUser = {
        id: String(users.length + 1), // Simple ID generation
        name,
        age,
        isWeeb
      };
      console.log(`Creating user: ${JSON.stringify(newUser)}`);
      users.push(newUser);
      return newUser;
    }
  }
};

export const resolvers = [resolver];