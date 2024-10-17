export interface EarthquakeItem {
	id: number;
	date: Date;
	lat: number;
	lng: number;
	magnitude: number;
}

export interface PageInfo {
	totalCount: number;
	limit: number;
	offset: number;
}
