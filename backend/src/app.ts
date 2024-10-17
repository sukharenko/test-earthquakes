import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

dotenv.config();

// Ensure PORT is typed and has a fallback
const PORT: number = parseInt(process.env.PORT || '4000', 10);

const main = async () => {
	const app = express();
	const httpServer = http.createServer(app);

	// Apollo Server initialization with typeDefs and resolvers
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await server.start();

	app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));

	// Start the HTTP server and listen on the defined port
	await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
	console.log(`Backend Server ready at http://localhost:${PORT}/graphql`);
};

main().catch((err) => {
	console.error('Error starting the server:', err);
});
