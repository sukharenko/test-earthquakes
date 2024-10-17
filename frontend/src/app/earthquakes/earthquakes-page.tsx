'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';

import ApolloWrapper from '@/utils/apollo';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Loading from '@/components/loading';
import Error from '@/components/error';
import TablePagination from '@/components/pagination';

import EarthquakesTable from './eartquakes-table';
import EarthquakeEditForm from './edit-form';

import { defaultItem, GET_EARTHQUAKES } from './schema';
import { type EarthquakeItem, type PageInfo } from '@/types/types';

const EartquakesList = () => {
	const [limit, setLimit] = useState<number>(10);
	const [offset, setOffset] = useState<number>(0);
	const [page, setPage] = useState<number>(0);

	const [formData, setEarthquakeItem] = useState<EarthquakeItem>(defaultItem);
	const [showForm, setShowForm] = useState<boolean>(false);

	const { loading, error, data, refetch } = useQuery<{
		getEarthquakes: {
			edges: EarthquakeItem[];
			pageInfo: PageInfo;
		};
	}>(GET_EARTHQUAKES, {
		variables: { offset, limit },
	});

	const setPageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLimit(Number(e?.target?.value));
	};

	const handleCloseForm = () => setShowForm(false);

	const handleShowForm = (item: EarthquakeItem = defaultItem) => {
		setEarthquakeItem(item);
		setShowForm(true);
	};

	const handleAddItem = () => {
		handleShowForm(defaultItem);
	};

	const handleEditItem = (item: EarthquakeItem) => {
		handleShowForm(item);
	};

	useEffect(() => {
		setOffset(page * limit);
		refetch();
	}, [page, limit]); // Adding `limit` to the dependency array

	if (loading) return <Loading />;

	if (error) {
		console.log('>>>', error);
		return <Error message={error.message} />;
	}

	// Checking data and pageInfo before destructuring
	if (!data || !data?.getEarthquakes || !data?.getEarthquakes?.pageInfo) return null;

	const { edges: items, pageInfo } = data.getEarthquakes;
	const { totalCount } = pageInfo;
	const maxPages = Math.ceil(totalCount / limit);

	return (
		<Container className="mt-4">
			<Row className="my-4">
				<Col xs={6} md={1}>
					<Form.Select value={limit} onChange={setPageSize}>
						{[5, 10, 20, 50, 100].map((pp: number) => (
							<option value={pp} key={pp}>
								{pp}
							</option>
						))}
					</Form.Select>
				</Col>
				<Col xs={6} md={11} className="text-end">
					<Button variant="success" onClick={handleAddItem}>
						Add
					</Button>
				</Col>
			</Row>

			<EarthquakesTable items={items} onEdit={handleEditItem} />

			<Row>
				<Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-start">
					Page {page + 1} of {maxPages}
				</Col>
				<Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end">
					<TablePagination pageInfo={pageInfo} setPage={setPage} />
				</Col>
			</Row>

			<EarthquakeEditForm show={showForm} formData={formData} handleClose={handleCloseForm} />
		</Container>
	);
};

const EarthquakesPage = () => {
	return (
		<ApolloWrapper>
			<EartquakesList />
		</ApolloWrapper>
	);
};

export default EarthquakesPage;
