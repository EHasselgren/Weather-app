import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import '../styles/weatherCard.css';
import dayNightImage from '../media/phase.v1.png';
import '../styles/DayNightBackground.css'




import { fetchWeatherFromSMHI } from '../utils/WeatherUtils';
const cities = {
    Stockholm: { lat: 59.3293, lon: 18.0686 },
    Göteborg: { lat: 57.7089, lon: 11.9746 },
    Malmö: { lat: 55.6050, lon: 13.0038 },
    Uppsala: { lat: 59.8586, lon: 17.6389 },
    Västerås: { lat: 59.6162, lon: 16.5528 },
    Örebro: { lat: 59.2741, lon: 15.2066 },
    Linköping: { lat: 58.4108, lon: 15.6214 },
    Helsingborg: { lat: 56.0465, lon: 12.6945 },
    Jönköping: { lat: 57.7815, lon: 14.1562 },
    Norrköping: { lat: 58.5942, lon: 16.1826 },
    Lund: { lat: 55.7047, lon: 13.1910 },
    Umeå: { lat: 63.8258, lon: 20.2630 },
    Gävle: { lat: 60.6749, lon: 17.1413 },
    Borås: { lat: 57.7210, lon: 12.9401 },
    Eskilstuna: { lat: 59.3666, lon: 16.5077 },
    Södertälje: { lat: 59.1955, lon: 17.6253 },
    Karlstad: { lat: 59.4029, lon: 13.5116 },
    Täby: { lat: 59.4439, lon: 18.0687 },
    Växjö: { lat: 56.8777, lon: 14.8091 },
    Halmstad: { lat: 56.6745, lon: 12.8568 },
    Sundsvall: { lat: 62.3908, lon: 17.3069 },
    Luleå: { lat: 65.5848, lon: 22.1547 },
    Trollhättan: { lat: 58.2837, lon: 12.2886 },
    Östersund: { lat: 63.1792, lon: 14.6357 },
    Kalmar: { lat: 56.6616, lon: 16.3616 },
    Skellefteå: { lat: 64.7507, lon: 20.9528 }
};


function WeatherCard() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState("Stockholm");
    const [rotation, setRotation] = useState(0);
    

    const updateWeatherData = async (lat, lon) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchWeatherFromSMHI(lat, lon);
            setWeather(data);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    
    const updateRotation = () => {
        const hour = new Date().getHours();
    
        
        const hoursSinceNoon = (hour >= 12) ? hour - 12 : hour + 12; 
        const newRotation = (hoursSinceNoon / 24) * 360; 
    
        setRotation(newRotation);
    };
    
    useEffect(() => {
        updateRotation(); // Set initial rotation
        const interval = setInterval(updateRotation, 60 * 60 * 1000); 
    
        return () => clearInterval(interval); 
    }, []);
    

    useEffect(() => {
        const city = cities[selectedCity]; 
        updateWeatherData(city.lat, city.lon);
    }, [selectedCity]);

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    

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
            <img
                src={dayNightImage}
                alt="Day and Night Background"
                className="day-night-image"
                style={{ transform: `rotate(${rotation}deg)` }}
            />
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Vädret nu</Card.Title>

                    <iframe
                        title="City Map"
                        width="100%"
                        height="150"
                        src={`https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&center=${cities[selectedCity].lat},${cities[selectedCity].lon}&zoom=10`}
                        style={{ border: 0 }}
                        allowFullScreen
                    ></iframe>

                    <Form.Select
                        aria-label="Select city"
                        className="my-3"
                        onChange={handleCityChange}
                        value={selectedCity}
                    >
                        {Object.keys(cities).map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </Form.Select>

                    <Card.Text>
                        <div className="mb-2">
                            <strong>Temperatur:</strong> {weather.temperature}°C
                        </div>
                        <div className="mb-2">
                            <strong>Vind:</strong> {weather.windSpeed} m/s
                        </div>
                        <div className="mb-2">
                            <strong>Kondition:</strong> {weather.condition}
                        </div>
                    </Card.Text>
                    <div className="d-flex gap-2">
                        <Button variant="primary" onClick={() => window.location.reload()}>
                            Uppdatera
                        </Button>
                        <Button variant="light" onClick={() => window.open('https://www.smhi.se/', '_blank')}>
                            SMHI
                        </Button>
                        <Button variant="info" onClick={() => alert('Weather data from SMHI API')}>
                            Info
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default WeatherCard;
