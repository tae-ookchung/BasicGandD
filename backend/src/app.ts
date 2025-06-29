import express from 'express';
import http from 'http';
import { ApolloServer } from "@apollo/server"
import { ExpressContextFunctionArgument, expressMiddleware } from '@apollo/server/express4';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from 'cors';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
import { db, EXAMPLETEST } from './db/db.js';
import bodyParser from 'body-parser';

const app = express();
const httpServer = http.createServer(app);
const port = 3000;

interface MyContext {
  req?: any;
}


const graphqlServer = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [
    // Install a landing page plugin based on NODE_ENV
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: 'mygraphql@graphql',
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});

await graphqlServer.start();
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  // @ts-ignore
  expressMiddleware(graphqlServer, {
    context: async ({ req }: ExpressContextFunctionArgument) => ({  }),
  })
);

(async () => {
  
  const exampletest = await db.select().from(EXAMPLETEST);
  console.log(exampletest);
})();

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});