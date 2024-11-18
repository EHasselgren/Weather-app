import { useState, useEffect } from "react";
import { Card, Container, Tab } from "react-bootstrap";
import { cities } from "../data/cities";
import { CityMap } from "../components/CityMap";
import { CitySelector } from "./CitySelector";
import { ErrorDisplay } from "./ErrorDisplay";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { WeatherInfo } from "./WeatherInfo";
import { weatherCardProps } from "../types/propTypes";
import { WeatherNav } from './WeatherNav';
import { DailyForecast } from '../components/Forecasts/DailyForecast' 
import dayNightImage from "../media/phase.v1.png";
import "../styles/weatherCard.css";
import "../styles/DayNightBackground.css";

export const WeatherCard = ({
  weather,
  loading,
  error,
  selectedCity,
  setSelectedCity,
}) => {
  const [rotation, setRotation] = useState(0);
  const [activeTab, setActiveTab] = useState('current');

  const updateRotation = () => {
    const hour = new Date().getHours();
    const hoursSinceNoon = hour >= 12 ? hour - 12 : hour + 12;
    const newRotation = (hoursSinceNoon / 24) * 360;
    setRotation(newRotation);
  };

  //funktion för att hantera att vi inte kan använda apiet 1000 ggr
const staticWeatherData = {
  hourly: Array(48).fill(null).map((_, i) => ({
    dt: Math.floor(Date.now()/1000) + (i * 3600),
    temp: 20 + Math.sin(i/24 * Math.PI) * 5,
    feels_like: 19 + Math.sin(i/24 * Math.PI) * 4,
    weather: [{
      description: ['clear sky', 'few clouds', 'scattered clouds', 'rain'][Math.floor(i/12) % 4]
    }],
    wind_speed: 2 + Math.random() * 3
  })),
  daily: Array(7).fill(null).map((_, i) => ({
    dt: Math.floor(Date.now()/1000) + (i * 86400),
    temp: {
      min: 15 + Math.random() * 5,
      max: 25 + Math.random() * 5
    },
    weather: [{
      description: ['clear sky', 'few clouds', 'scattered clouds', 'rain'][i % 4]
    }],
    pop: Math.random()
  }))
};

  useEffect(() => {
    updateRotation();
    const interval = setInterval(updateRotation, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <img
        src={dayNightImage}
        alt="Day and Night Background"
        className="day-night-image"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
      <Card style={{ width: "22rem" }}>
        <Card.Body>
          <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
            <WeatherNav activeKey={activeTab} onSelect={setActiveTab} />

            <CitySelector
              selectedCity={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            />

            <Tab.Content>
              <Tab.Pane eventKey="current">
                <CityMap
                  lat={cities[selectedCity].lat}
                  lon={cities[selectedCity].lon}
                />
                <WeatherInfo
                  temperature={weather.temperature}
                  windSpeed={weather.windSpeed}
                  condition={weather.condition}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="forecast">
              <DailyForecast 
          data={staticWeatherData.daily}
          hourlyData={staticWeatherData.hourly}
        />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

WeatherCard.propTypes = weatherCardProps;

export default WeatherCard;

