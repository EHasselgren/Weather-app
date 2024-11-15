import { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { cities } from "../data/cities";
import { CityMap } from "../components/CityMap";
import { CitySelector } from "./CitySelector";
import { ErrorDisplay } from "./ErrorDisplay";
import { ActionButtons } from "./ActionButtons";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { WeatherInfo } from "./WeatherInfo";
import { weatherCardProps } from "../types/propTypes";
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

  const updateRotation = () => {
    const hour = new Date().getHours();
    const hoursSinceNoon = hour >= 12 ? hour - 12 : hour + 12;
    const newRotation = (hoursSinceNoon / 24) * 360;
    setRotation(newRotation);
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
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title>Vädret nu</Card.Title>
          <CityMap
            lat={cities[selectedCity].lat}
            lon={cities[selectedCity].lon}
          />
          <CitySelector
            selectedCity={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          />
          <WeatherInfo
            temperature={weather.temperature}
            windSpeed={weather.windSpeed}
            condition={weather.condition}
          />
          <ActionButtons />
        </Card.Body>
      </Card>
    </Container>
  );
};

WeatherCard.propTypes = weatherCardProps;

export default WeatherCard;
