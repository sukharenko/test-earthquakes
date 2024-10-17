import React from 'react';
import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata: Metadata = {
	title: 'Earthquakes',
	description: 'Earthquakes page providing information',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" data-bs-theme="light">
			<body>{children}</body>
		</html>
	);
}
