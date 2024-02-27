import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Query {
    greeting: String
  }
`;

const resolvers = {
  Query: {
    greeting: () => 'hello chaudhuree'
  }
};

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, { listen: { port: 9000 } });
  console.log(`🚀 Server ready at ${url}`);
};

startServer();
