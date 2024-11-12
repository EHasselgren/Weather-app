import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { fetchWeatherFromSMHI } from '../utils/WeatherUtils';

function WeatherCard() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                //koordinater från stockholm:
              const data = await fetchWeatherFromSMHI(55.6050, 13.0038);
                setWeather(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        getWeather();
    }, []);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
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

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Current Weather</Card.Title>
                    <Card.Text>
                        <div className="mb-2">
                            <strong>Temperature:</strong> {weather.temperature}°C
                        </div>
                        <div className="mb-2">
                            <strong>Wind Speed:</strong> {weather.windSpeed} m/s
                        </div>
                        <div className="mb-2">
                            <strong>Condition:</strong> {weather.condition}
                        </div>
                    </Card.Text>
                    <div className="d-flex gap-2">
                        <Button 
                            variant="primary" 
                            onClick={() => window.location.reload()}
                        >
                            Refresh
                        </Button>
                        <Button 
                            variant="light"
                            onClick={() => window.open('https://www.smhi.se/', '_blank')}
                        >
                            SMHI
                        </Button>
                        <Button 
                            variant="info"
                            onClick={() => alert('Weather data from SMHI API')}
                        >
                            Info
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default WeatherCard;
