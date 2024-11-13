import { useState, useEffect } from 'react';
import { fetchWeatherFromSMHI } from "../utils/WeatherUtils";

export const useWeather = (lat, lon) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateWeatherData = async () => {
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
    updateWeatherData();
  }, [lat, lon]);

  return { weather, loading, error, refreshWeather: updateWeatherData };
};