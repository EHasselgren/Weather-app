import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function WeatherCard() {
    return (
      <Container className="d-flex justify-content-center align-items-center">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <div className="d-flex gap-2">
              <Button variant="primary">Go somewhere</Button>
              <Button variant="light">Light</Button>
              <Button variant="info">Info</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  
  export default WeatherCard;