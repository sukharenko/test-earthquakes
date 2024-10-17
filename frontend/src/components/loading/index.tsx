import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

const Loading: React.FC = () => {
	return (
		<Container className="text-center my-4">
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</Container>
	);
};

export default Loading;
