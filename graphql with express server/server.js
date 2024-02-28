import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import fs from 'node:fs/promises'; // this returns the data in text format
import cors from 'cors';
import express from 'express';
import { resolvers } from './resolvers.js';

const app = express();

const typeDefs = await fs.readFile('./schema.graphql', 'utf-8');
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();


app.use(cors(), express.json())
app.get('/', (req, res) => {
  res.send('server is running 🚀');
});
app.use('/graphql',  apolloMiddleware(server));

app.listen(9000, () => {
  console.log('Server started on http://localhost:9000');
  console.log('Server started on http://localhost:9000/graphql');
});

