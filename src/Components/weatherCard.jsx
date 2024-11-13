import  { useState } from 'react';
import { Card } from 'react-bootstrap';
import { cities } from "../data/Cities";
import { useWeather } from '../hooks/useWeather';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorDisplay } from './ErrorDisplay';
import { DayNightRotation } from './DayNightRotation';
import { GoogleMap } from './GoogleMap';
import { CitySelector } from './CitySelector';
import { WeatherInfo } from './WeatherInfo';
import { ActionButtons } from './ActionButtons';
import "../styles/weatherCard.css";

function WeatherCard() {
  const [selectedCity, setSelectedCity] = useState("Stockholm");
  const city = cities[selectedCity];
  const { weather, loading, error, refreshWeather } = useWeather(city.lat, city.lon);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} onRetry={refreshWeather} />;

  return (
    <div className="weather-card-container">
      <DayNightRotation />
      <Card style={{ width: "18rem", position: "relative", zIndex: 1 }}>
        <Card.Body>
          <Card.Title>Vädret nu</Card.Title>
          <GoogleMap lat={city.lat} lon={city.lon} />
          <CitySelector 
            selectedCity={selectedCity} 
            onCityChange={handleCityChange} 
          />
          <WeatherInfo weather={weather} />
          <ActionButtons />
        </Card.Body>
      </Card>
    </div>
  );
}

export default WeatherCard;