import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

interface ErrorProps {
	message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
	return (
		<Container className="mt-4">
			<Alert variant="danger">Error: {message}</Alert>
		</Container>
	);
};

export default Error;
