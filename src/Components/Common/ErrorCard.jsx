import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export function ErrorCard({ error }) {
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card style={{ width: '18rem' }} className="text-center">
                <Card.Body>
                    <Card.Title className="text-danger">Error</Card.Title>
                    <Card.Text>{error}</Card.Text>
                    <Button variant="primary" onClick={() => window.location.reload()}>
                        Retry
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

ErrorCard.propTypes = {
    error: PropTypes.string.isRequired
};