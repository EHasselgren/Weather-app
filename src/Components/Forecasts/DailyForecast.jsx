import { useState, useRef } from "react";
import {
  faSun,
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faTemperatureHigh,
  faTemperatureLow,
  faDroplet,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { weatherInfoProps } from "../../types/propTypes";
import TemperatureChart from "./TemperatureChart";

const COLORS = {
  highTemp: "#FF5733",
  lowTemp: "#33A1FF",
  sun: "#FFD700",
  cloud: "#8BA4B4",
  rain: "#4682B4",
  snow: "#B4CFEC",
  chevron: "#666666",
  precipitation: "#4682B4",
};

const getWeatherIcon = (description) => {
  const lowercaseDesc = description.toLowerCase();
  let icon, color;

  switch (true) {
    case lowercaseDesc.includes("clear"):
      icon = faSun;
      color = COLORS.sun;
      break;
    case lowercaseDesc.includes("cloud"):
      icon = faCloud;
      color = COLORS.cloud;
      break;
    case lowercaseDesc.includes("rain"):
      icon = faCloudRain;
      color = COLORS.rain;
      break;
    case lowercaseDesc.includes("snow"):
      icon = faCloudShowersHeavy;
      color = COLORS.snow;
      break;
    default:
      icon = faCloud;
      color = COLORS.cloud;
  }

  return (
    <FontAwesomeIcon
      icon={icon}
      className={`icon ${lowercaseDesc.split(" ")[0]}`}
      style={{ color }}
    />
  );
};

export const DailyForecast = ({ data, hourlyData }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [chartTop, setChartTop] = useState(0);
  const rowRefs = useRef([]);

  const handleDayClick = (index) => {
    if (index < 2) {
      if (selectedDayIndex === index) {
        setSelectedDayIndex(null);
      } else {
        const rowRect = rowRefs.current[index].getBoundingClientRect();
        setChartTop(rowRect.height + rowRefs.current[index].offsetTop);
        setSelectedDayIndex(index);
      }
    }
  };

  const getHourlyDataForDay = (index) => {
    if (!Array.isArray(hourlyData)) return [];

    const dayStart = new Date(data[index].dt * 1000).setHours(0, 0, 0, 0);
    const dayEnd = new Date(data[index].dt * 1000).setHours(23, 59, 59, 999);

    return hourlyData.filter((hour) => {
      const hourTime = hour.dt * 1000;
      return hourTime >= dayStart && hourTime <= dayEnd;
    });
  };

  return (
    <div className="daily-forecast">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="text-secondary">
              <th className="py-2 text-start w-24">Day</th>
              <th className="py-2 d-none d-sm-table-cell text-start pl-16">Condition</th>
              <th className="py-2 text-center w-16">
                <div className="flex justify-center">
                  <FontAwesomeIcon
                    icon={faTemperatureHigh}
                    title="High Temperature"
                    style={{ color: COLORS.highTemp }}
                  />
                </div>
              </th>
              <th className="py-2 text-center w-16">
                <div className="flex justify-center">
                  <FontAwesomeIcon
                    icon={faTemperatureLow}
                    title="Low Temperature"
                    style={{ color: COLORS.lowTemp }}
                  />
                </div>
              </th>
              <th className="py-2 text-center w-16">
                <div className="flex justify-center">
                  <FontAwesomeIcon
                    icon={faDroplet}
                    title="Precipitation"
                    style={{ color: COLORS.precipitation }}
                  />
                </div>
              </th>
              <th className="py-2 w-8 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((day, index) => (
              <tr
                key={index}
                ref={el => rowRefs.current[index] = el}
                onClick={() => handleDayClick(index)}
                className={`forecast-row ${index < 2 ? "has-hourly" : ""} ${
                  selectedDayIndex === index ? "selected" : ""
                }`}
              >
                <td className="py-2 text-start">
                  {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </td>
                <td className="condition py-2 d-none d-sm-table-cell">
                  <div className="flex items-center justify-center space-x-4">
                    <span className="me-2">
                      {getWeatherIcon(day.weather[0].description)}
                    </span>
                    <span>{day.weather[0].description}</span>
                  </div>
                </td>
                <td className="py-2 text-center" style={{ color: COLORS.highTemp }}>
                  {Math.round(day.temp.max)}°
                </td>
                <td className="py-2 text-center" style={{ color: COLORS.lowTemp }}>
                  {Math.round(day.temp.min)}°
                </td>
                <td className="py-2 text-center" style={{ color: COLORS.precipitation }}>
                  {day.pop ? `${Math.round(day.pop * 100)}%` : "0%"}
                </td>
                <td className="py-2 text-center chevron-cell">
                  {index < 2 && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`chevron-icon ${
                        selectedDayIndex === index ? "rotate" : ""
                      }`}
                      style={{ color: COLORS.chevron }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedDayIndex !== null && selectedDayIndex < 2 && (
          <div 
            className="temperature-chart-overlay"
            style={{ top: `${chartTop}px` }}
          >
            <div className="p-4">
              <TemperatureChart
                hourlyData={getHourlyDataForDay(selectedDayIndex)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyForecast;

DailyForecast.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(weatherInfoProps)).isRequired,
  hourlyData: PropTypes.arrayOf(PropTypes.shape(weatherInfoProps)).isRequired,
};