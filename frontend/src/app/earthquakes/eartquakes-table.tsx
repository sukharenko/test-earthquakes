'use client';

import React from 'react';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { confirm } from '@/components/confirm';
import { DELETE_EARTHQUAKE } from './schema';

import { type EarthquakeItem } from '@/types/types';

interface TableRowProps {
	item: EarthquakeItem;
	handleEdit: (item: EarthquakeItem) => void;
}

const TableRow: React.FC<TableRowProps> = ({ item, handleEdit }) => {
	const [deleteEarthquake] = useMutation(DELETE_EARTHQUAKE, {
		refetchQueries: ['GetEarthquakes'],
	});

	const handleDelete = async () => {
		if (await confirm('Are you sure?')) {
			deleteEarthquake({
				variables: {
					id: item.id,
				},
			});
		}
	};

	return (
		<tr className="small">
			<td>{item?.id}</td>
			<td>{format(new Date(item?.date), 'PPPppp')}</td>
			<td>{item?.lat}</td>
			<td>{item?.lng}</td>
			<td>{item?.magnitude}</td>
			<td>
				<div className="d-flex gap-2">
					<Button variant="primary" size="sm" onClick={() => handleEdit(item)}>
						Edit
					</Button>
					<Button variant="danger" size="sm" onClick={handleDelete}>
						Delete
					</Button>
				</div>
			</td>
		</tr>
	);
};

// Define props for EarthquakesTable component
interface EarthquakesTableProps {
	items: EarthquakeItem[];
	onEdit: (item: EarthquakeItem) => void;
}

const EarthquakesTable: React.FC<EarthquakesTableProps> = ({ items, onEdit }) => {
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>ID</th>
					<th>Date</th>
					<th>Latitude</th>
					<th>Longitude</th>
					<th>Magnitude</th>
					<th>&nbsp;</th>
				</tr>
			</thead>
			<tbody>
				{items.map((item: EarthquakeItem, index: number) => (
					<TableRow item={item} handleEdit={onEdit} key={index} />
				))}
			</tbody>
		</Table>
	);
};

export default EarthquakesTable;
