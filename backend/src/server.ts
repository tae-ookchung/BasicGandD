import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql_server/schema_server.js";
import { resolvers } from "./graphql_server/resolvers_server.js";

const server = new ApolloServer({ 
  typeDefs, 
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);

