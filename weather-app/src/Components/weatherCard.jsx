import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function WeatherCard() {
    return (
      <Container className="d-flex justify-content-center align-items-center">
        <Card style={{ width: '18rem' }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              sample text
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