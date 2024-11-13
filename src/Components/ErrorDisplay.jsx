import PropTypes from 'prop-types';
import { Container, Card, Button } from "react-bootstrap";

export const ErrorDisplay = ({ error, onRetry }) => (
  <Container className="d-flex justify-content-center align-items-center">
    <Card style={{ width: "18rem" }} className="text-center">
      <Card.Body>
        <Card.Title className="text-danger">Error</Card.Title>
        <Card.Text>{error}</Card.Text>
        <Button variant="primary" onClick={onRetry}>
          Retry
        </Button>
      </Card.Body>
    </Card>
  </Container>
);

ErrorDisplay.propTypes = {
  error: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired
};