const schema = `#graphql
  type User {
    id: ID!
    uuid: String!
    name: String!
    email: String!
    token: String
  }

  input AuthInput {
    email: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    signin(input: AuthInput!): User
    createUser(input: AuthInput!): User
  }
`





export const typeDefs = [schema];

