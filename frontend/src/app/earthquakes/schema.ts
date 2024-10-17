import * as yup from 'yup';
import { gql } from '@apollo/client';

import { type EarthquakeItem } from '@/types/types';

// Validation schema using yup
export const schema = yup
	.object({
		id: yup.number().optional(),
		date: yup.date().required(),
		lat: yup.number().min(-90).max(90).required(),
		lng: yup.number().min(-180).max(180).required(),
		magnitude: yup.number().min(1).max(9.9).required(),
	})
	.required();

// Automatically inferring the type of the form data from the yup schema
export type FormData = yup.InferType<typeof schema>;

// Default item to be used for initializing form data
export const defaultItem: EarthquakeItem = {
	id: 0,
	date: new Date(),
	lat: 0,
	lng: 0,
	magnitude: 1,
};

// GraphQL queries and mutations

// Query for fetching earthquakes with pagination
export const GET_EARTHQUAKES = gql`
	query GetEarthquakes($offset: Int, $limit: Int) {
		getEarthquakes(offset: $offset, limit: $limit) {
			edges {
				id
				date
				lat
				lng
				magnitude
			}
			pageInfo {
				limit
				offset
				totalCount
			}
		}
	}
`;

// Mutation for creating a new earthquake entry
export const CREATE_EARTHQUAKE = gql`
	mutation CreateEarthquake($date: Date!, $lat: Float!, $lng: Float!, $magnitude: Float!) {
		createEarthquake(date: $date, lat: $lat, lng: $lng, magnitude: $magnitude) {
			id
			date
			lat
			lng
			magnitude
		}
	}
`;

// Mutation for updating an existing earthquake entry
export const UPDATE_EARTHQUAKE = gql`
	mutation UpdateEarthquake($id: Int!, $date: Date, $lat: Float, $lng: Float, $magnitude: Float) {
		updateEarthquake(id: $id, date: $date, lat: $lat, lng: $lng, magnitude: $magnitude) {
			id
			date
			lat
			lng
			magnitude
		}
	}
`;

// Mutation for deleting an earthquake entry
export const DELETE_EARTHQUAKE = gql`
	mutation DeleteEarthquake($id: Int!) {
		deleteEarthquake(id: $id) {
			id
			date
			lat
			lng
			magnitude
		}
	}
`;
