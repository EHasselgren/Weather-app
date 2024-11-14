import { Button, Card, Container } from 'react-bootstrap';
import { errorDisplayProps } from '../types/propTypes';

export const ErrorDisplay = ({ message }) => (
    <Container className="d-flex justify-content-center align-items-center">
        <Card style={{ width: '18rem' }} className="text-center">
            <Card.Body>
                <Card.Title className="text-danger">Error</Card.Title>
                <Card.Text>{message}</Card.Text>
                <Button variant="primary" onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </Card.Body>
        </Card>
    </Container>
);

ErrorDisplay.propTypes = errorDisplayProps;