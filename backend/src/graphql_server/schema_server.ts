const schema = `#graphql
  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
    hello: String
  }

  type Mutation {
    createUser(name: String!, age: Int!, isWeeb: Boolean!): User
  }

  type User {
    id: ID!
    name: String!
    age: Int
    isWeeb: Boolean
  }
`;

export const typeDefs = [schema];