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
import { DailyForecast } from '../components/Forecasts/DailyForecast';
import dayNightImage from "../media/phase.v1.png";
import "../styles/weatherCard.css";
import "../styles/DayNightBackground.css";

export const WeatherCard = ({
  weather,
  loading: externalLoading,
  error: externalError,
  selectedCity,
  setSelectedCity,
}) => {
  const [rotation, setRotation] = useState(0);
  const [activeTab, setActiveTab] = useState('current');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateRotation = () => {
    const hour = new Date().getHours();
    const hoursSinceNoon = hour >= 12 ? hour - 12 : hour + 12;
    const newRotation = (hoursSinceNoon / 24) * 360;
    setRotation(newRotation);
  };

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=55.605&lon=13.0038&exclude=minutely,alerts&units=metric&appid=6c367f925c33f3acd180aa16e11c86fa`
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Detailed Fetch Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateRotation();
    fetchWeather();
    const interval = setInterval(updateRotation, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Show loading state while fetching data
  if (externalLoading || loading) return <LoadingSpinner />;
  
  // Show error state if there's an error
  if (externalError || error) return <ErrorDisplay message={externalError || error} />;

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <img
        src={dayNightImage}
        alt="Day and Night Background"
        className="day-night-image"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
      <Card style={{ width: "35rem" }}>
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
                {weatherData && (
                  <DailyForecast 
                    data={weatherData.daily.slice(0, 24)}
                    hourlyData={weatherData.hourly.slice(0, 24)}
                  />
                )}
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