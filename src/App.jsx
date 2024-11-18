import { useState, useEffect } from "react";
import { WeatherCard } from "./components/weatherCard";
import { cities } from "./data/cities";
import { fetchWeatherFromSMHI } from "./utils/WeatherUtils";
import SeasonBackground from "./Components/SeasonBackground";
import "./App.css";
import "./styles/weatherCard.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
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

  const getTemperatureClass = () => {
    if (!weather) return "";
    if (weather.temperature <= 5) return "temp-cold";
    if (weather.temperature <= 15) return "temp-mild";
    if (weather.temperature <= 20) return "temp-warm";
    return "temp-hot";
  };

  return (
    <div>
      <SeasonBackground />
      <div className={`center-content ${getTemperatureClass()}`}>
        <WeatherCard
          weather={weather}
          loading={loading}
          error={error}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </div>
    </div>
  );
}

export default App;
