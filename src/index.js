import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { authMiddleware, handleLogin, handleSignup } from './controllers/session.controller.js';
import { resolvers, typeDefs } from './graphql/index.js';
import { getContext } from './graphql/context.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors(), bodyParser.json());

app.post('/login', handleLogin);
app.post('/signup', handleSignup);

app.use(authMiddleware)

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer, { context: getContext }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});