import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function Home() {
	return (
		<Container className="my-4 d-flex align-items-center justify-content-center">
			<Link href="/earthquakes" passHref>
				<Button className="btn-primary">Earthquakes</Button>
			</Link>
		</Container>
	);
}
