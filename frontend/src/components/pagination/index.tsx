'use client';

import Pagination from 'react-bootstrap/Pagination';

import { type PageInfo } from '@/types/types';

// Type definition for the component props
interface TablePaginationProps {
	pageInfo: PageInfo;
	setPage: (page: number) => void;
}

// Helper function to generate the page range
export const pageRange = (
	activePage: number,
	pageNeighbours: number,
	totalPages: number
): (number | string)[] => {
	let range: (number | string)[] = [];

	// Add active page and neighboring pages
	for (let page = activePage - pageNeighbours; page <= activePage + pageNeighbours; page++) {
		range.push(page);
	}

	// Filter out pages that are out of range
	range = range.filter(
		(page: number | string) => typeof page === 'number' && page > 0 && page <= totalPages
	);

	// Allow user to go to the first page if necessary
	if (range[0] !== 1) {
		if (range[1] !== 2) {
			range.unshift('...');
		}
		range.unshift(1);
	}

	// Allow user to go to the last page, handle ellipsis for last page range
	if (range[range.length - 1] !== totalPages) {
		if (range[range.length - 2] !== totalPages - 1) {
			range.push('...');
		}
		range.push(totalPages);
	}

	return range;
};

// Main pagination component
const TablePagination: React.FC<TablePaginationProps> = ({ pageInfo, setPage }) => {
	if (!pageInfo) return null;

	const { totalCount, limit, offset } = pageInfo;
	const page = Math.floor(offset / limit);
	const maxPages = Math.ceil(totalCount / limit);

	const pagesArray = pageRange(page + 1, 3, maxPages); // Adjusting page to be 1-based

	if (totalCount === 0) return null;

	return (
		<Pagination>
			<Pagination.First
				disabled={page === 0}
				onClick={() => {
					setPage(0);
				}}
			/>
			<Pagination.Prev
				disabled={page === 0}
				onClick={() => {
					setPage(page - 1);
				}}
			/>
			{pagesArray.map((p, index) => {
				return (
					<Pagination.Item
						key={index}
						active={typeof p === 'number' && p - 1 === page}
						disabled={p === '...'}
						onClick={() => {
							if (typeof p === 'number') {
								setPage(p - 1);
							}
						}}
					>
						{p}
					</Pagination.Item>
				);
			})}
			<Pagination.Next
				disabled={page + 1 >= maxPages}
				onClick={() => {
					setPage(page + 1);
				}}
			/>
			<Pagination.Last
				disabled={page + 1 >= maxPages}
				onClick={() => {
					setPage(maxPages - 1);
				}}
			/>
		</Pagination>
	);
};

export default TablePagination;
