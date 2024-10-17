import { PrismaClient, Earthquakes } from '@prisma/client';

const prisma = new PrismaClient();

// Define argument types
interface PaginationArgs {
	limit?: number;
	offset?: number;
}

interface EarthquakeArgs {
	id: number;
	lat?: number;
	lng?: number;
	magnitude?: number;
	date?: any;
}

export const resolvers = {
	Query: {
		getEarthquakes: async (_parent: unknown, { limit = 20, offset = 0 }: PaginationArgs) => {
			try {
				const [totalCount, edges] = await prisma.$transaction([
					prisma.earthquakes.count(),
					prisma.earthquakes.findMany({
						skip: offset,
						take: limit,
						orderBy: {
							date: 'desc',
						},
					}),
				]);

				return {
					edges,
					pageInfo: {
						totalCount,
						offset,
						limit,
					},
				};
			} catch (error) {
				console.error('Error fetching earthquakes:', error);
				throw new Error('Error fetching earthquakes from the database');
			}
		},

		getEarthquake: async (_parent: unknown, { id }: { id: number }) => {
			try {
				const earthquake = await prisma.earthquakes.findUnique({
					where: { id },
				});
				if (!earthquake) {
					throw new Error(`Earthquake with ID: ${id} not found`);
				}
				return earthquake;
			} catch (error) {
				console.error(`Error fetching earthquake with ID ${id}:`, error);
				throw new Error(`Error fetching earthquake with ID: ${id} from the database`);
			}
		},
	},

	Mutation: {
		createEarthquake: async (_parent: unknown, { lat, lng, magnitude, date }: EarthquakeArgs) => {
			try {
				return await prisma.earthquakes.create({
					data: { lat, lng, magnitude, date },
				});
			} catch (error) {
				console.error('Error creating a new earthquake:', error);
				throw new Error('Error creating a new earthquake in the database');
			}
		},

		updateEarthquake: async (_parent: unknown, { id, ...data }: EarthquakeArgs) => {
			try {
				const earthquake = await prisma.earthquakes.update({
					where: { id },
					data,
				});
				return earthquake;
			} catch (error) {
				console.error(`Error updating earthquake with ID ${id}:`, error);
				throw new Error(`Error updating earthquake with ID: ${id} in the database`);
			}
		},

		deleteEarthquake: async (_parent: unknown, { id }: { id: number }) => {
			try {
				const deletedEarthquake = await prisma.earthquakes.delete({
					where: { id },
				});
				return deletedEarthquake;
			} catch (error) {
				console.error(`Error deleting earthquake with ID ${id}:`, error);
				throw new Error(`Error deleting earthquake with ID: ${id} from the database`);
			}
		},
	},
};
