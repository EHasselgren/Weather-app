import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

export function LoadingSpinner() {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );
}