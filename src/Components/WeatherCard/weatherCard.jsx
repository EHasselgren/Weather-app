import { useState, useEffect } from 'react';
import { CitySelector } from './CitySelector';
import { WeatherInfo } from './WeatherInfo';
import { MapView } from './MapView';
import { ButtonGroup } from './ButtonGroup';
import { DayNightImage } from './DayNightImage';
import { cities } from '../../data/Cities';
import { fetchWeatherFromSMHI } from '../../utils/WeatherUtils';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorCard } from '../common/ErrorCard';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export function WeatherCard() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState("Stockholm");

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

    useEffect(() => {
        const city = cities[selectedCity];
        updateWeatherData(city.lat, city.lon);
    }, [selectedCity]);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorCard error={error} />;

    return (
        <div className="day-night-container">
            <DayNightImage />
            <Container className="d-flex justify-content-center align-items-center">
                <Card style={{ width: '18rem', position: 'relative', zIndex: 1 }}>
                    <Card.Body>
                        <Card.Title>Vädret nu</Card.Title>
                        <MapView selectedCity={selectedCity} />
                        <CitySelector 
                            selectedCity={selectedCity}
                            onCityChange={setSelectedCity}
                        />
                        <WeatherInfo weather={weather} />
                        <ButtonGroup />
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}