import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
	const csvData: any = [];
	fs.createReadStream(__dirname + '/../data/earthquakes1970-2014.csv')
		.pipe(csv())
		.on('data', (data) => csvData.push(data))
		.on('end', async () => {
			const records: Prisma.EarthquakesCreateInput[] = csvData.map((record: any) => ({
				date: new Date(record.DateTime),
				lat: record.Latitude * 1,
				lng: record.Longitude * 1,
				magnitude: record.Magnitude * 1,
			}));

			const promises = records.map((record) =>
				prisma.earthquakes.create({
					data: record,
				})
			);
			const results = await Promise.all(promises);
			console.log(`Seeding completed successfully:`, results);
		});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
