import React, { useState } from 'react';
import { faSun, faCloud, faCloudRain, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { weatherInfoProps } from '../../types/propTypes';
import TemperatureChart from './TemperatureChart';
import '../../styles/dailyforecast.css';

const getWeatherIcon = (description) => {
  const lowercaseDesc = description.toLowerCase();
  if (lowercaseDesc.includes('clear')) return <FontAwesomeIcon icon={faSun} className="icon sun" />;
  if (lowercaseDesc.includes('cloud')) return <FontAwesomeIcon icon={faCloud} className="icon cloud" />;
  if (lowercaseDesc.includes('rain')) return <FontAwesomeIcon icon={faCloudRain} className="icon rain" />;
  if (lowercaseDesc.includes('snow')) return <FontAwesomeIcon icon={faCloudShowersHeavy} className="icon snow" />;
  return <FontAwesomeIcon icon={faCloud} className="icon default" />;
 };

export const DailyForecast = ({ data, hourlyData }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  const handleDayClick = (index) => {
    setSelectedDayIndex(selectedDayIndex === index ? null : index);
  };

  const getHourlyDataForDay = (dayIndex) => {
    const startOfDay = dayIndex * 24;
    const endOfDay = startOfDay + 24;
    return hourlyData.slice(startOfDay, endOfDay);
  };

  return (
    <div className="daily-forecast">
      <h2>Daily Forecast</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Condition</th>
            <th>High</th>
            <th>Low</th>
            <th>Precipitation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((day, index) => (
            <React.Fragment key={index}>
              <tr
                onClick={() => handleDayClick(index)}
                className={selectedDayIndex === index ? 'selected' : ''}
              >
                <td>
                  {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                </td>
                <td className="condition">
                  {getWeatherIcon(day.weather[0].description)}
                  <span>{day.weather[0].description}</span>
                </td>
                <td className="high">{Math.round(day.temp.max)}°</td>
                <td className="low">{Math.round(day.temp.min)}°</td>
                <td>{day.pop ? `${Math.round(day.pop * 100)}%` : '0%'}</td>
              </tr>
              {selectedDayIndex === index && (
                <tr>
                  <td colSpan="5">
                  <TemperatureChart hourlyData={getHourlyDataForDay(index)} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyForecast;

DailyForecast.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(weatherInfoProps)).isRequired,
    hourlyData: PropTypes.arrayOf(PropTypes.shape(weatherInfoProps)).isRequired
  };