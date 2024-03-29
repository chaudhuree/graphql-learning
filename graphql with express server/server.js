import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import fs from 'node:fs/promises'; // this returns the data in text format
import cors from 'cors';
import express from 'express';
import { resolvers } from './resolvers.js';
import { authMiddleware, handleLogin } from './auth.js';
import { getUser } from './db/users.js';

const app = express();

const typeDefs = await fs.readFile('./schema.graphql', 'utf-8');
async function  getContext({ req }) {
  // req.auth = {sub:'user id', email:'user email'}
  if (req.auth) {
    const user = await getUser(req.auth.sub); //sub is the user id here
    return { user };
  }
  return {};
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();


app.use(cors(), express.json(),authMiddleware)
app.get('/', (req, res) => {
  res.send('server is running 🚀');
});
app.post('/login', handleLogin);
app.use('/graphql',  apolloMiddleware(server,{context:getContext}));

app.listen(9000, () => {
  console.log('Server started on http://localhost:9000');
  console.log('Server started on http://localhost:9000/graphql');
});

