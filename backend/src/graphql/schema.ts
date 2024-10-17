import gql from 'graphql-tag';
import { GraphQLScalarType, Kind } from 'graphql';

// Date scalar definition
export const dateScalar = new GraphQLScalarType({
	name: 'Date',
	description: 'Custom Date scalar type',
	serialize(value: any) {
		return value instanceof Date ? value.toISOString() : null; // Convert Date to ISO string for output
	},
	parseValue(value: any) {
		return value ? new Date(value) : null; // Convert input value to Date
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.STRING) {
			return new Date(ast.value); // Convert hard-coded AST string to Date
		}
		return null;
	},
});

// Define the GraphQL schema using the gql template literal
export const typeDefs = gql`
	scalar Date

	type Earthquake {
		id: Int!
		lat: Float!
		lng: Float!
		magnitude: Float!
		date: Date!
	}

	type PageInfo {
		totalCount: Int
		offset: Int
		limit: Int
	}

	type Earthquakes {
		edges: [Earthquake]
		pageInfo: PageInfo
	}

	type Query {
		getEarthquakes(offset: Int, limit: Int): Earthquakes
		getEarthquake(id: Int!): Earthquake
	}

	type Mutation {
		createEarthquake(lat: Float!, lng: Float!, magnitude: Float!, date: Date!): Earthquake
		updateEarthquake(id: Int!, lat: Float, lng: Float, magnitude: Float, date: Date): Earthquake
		deleteEarthquake(id: Int!): Earthquake
	}
`;
