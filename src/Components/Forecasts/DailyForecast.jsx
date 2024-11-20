import React, { useState } from "react";
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
import "../../styles/dailyforecast.css";

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

  const handleDayClick = (index) => {
    if (index < 2) {
      setSelectedDayIndex(selectedDayIndex === index ? null : index);
    }
  };

  const getHourlyDataForDay = (dayIndex) => {
    if (!Array.isArray(hourlyData)) return [];

    const dayStart = new Date(data[dayIndex].dt * 1000).setHours(0, 0, 0, 0);
    const dayEnd = new Date(data[dayIndex].dt * 1000).setHours(23, 59, 59, 999);

    return hourlyData.filter((hour) => {
      const hourTime = hour.dt * 1000;
      return hourTime >= dayStart && hourTime <= dayEnd;
    });
  };
  return (
    <div className="daily-forecast">
      <div className="table-responsive">
        <table className="table  mb-0">
          <thead>
            <tr className="text-secondary">
              <th className="py-2">Day</th>
              <th className="py-2 d-none d-sm-table-cell">Condition</th>
              <th className="py-2">
                <FontAwesomeIcon
                  icon={faTemperatureHigh}
                  title="High Temperature"
                  style={{ color: COLORS.highTemp }}
                />
                <span className="sr-only">High Temperature</span>
              </th>
              <th className="py-2">
                <FontAwesomeIcon
                  icon={faTemperatureLow}
                  title="Low Temperature"
                  style={{ color: COLORS.lowTemp }}
                />
                <span className="sr-only">Low Temperature</span>
              </th>
              <th className="py-2">
                <FontAwesomeIcon
                  icon={faDroplet}
                  title="Precipitation"
                  style={{ color: COLORS.precipitation }}
                />
                <span className="sr-only">Precipitation</span>
              </th>
              <th className="py-2 chevron-cell"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((day, index) => (
              <React.Fragment key={index}>
                <tr
                  onClick={() => handleDayClick(index)}
                  className={`forecast-row ${
                    selectedDayIndex === index ? "selected" : ""
                  } ${index < 2 ? "has-hourly" : ""}`}
                >
                  <td className="py-2">
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </td>
                  <td className="condition py-2 d-none d-sm-table-cell">
                    <div className="d-flex align-items-center">
                      {getWeatherIcon(day.weather[0].description)}
                      <span className="ms-2">{day.weather[0].description}</span>
                    </div>
                  </td>
                  <td className="py-2" style={{ color: COLORS.highTemp }}>
                    {Math.round(day.temp.max)}°
                  </td>
                  <td className="py-2" style={{ color: COLORS.lowTemp }}>
                    {Math.round(day.temp.min)}°
                  </td>
                  <td className="py-2" style={{ color: COLORS.precipitation }}>
                    {day.pop ? `${Math.round(day.pop * 100)}%` : "0%"}
                  </td>
                  <td className="chevron-cell py-2">
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
                {selectedDayIndex === index && index < 2 && (
                  <tr className="chart-row">
                    <td colSpan="6">
                      <div className="p-3">
                        <TemperatureChart
                          hourlyData={getHourlyDataForDay(index)}
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyForecast;

DailyForecast.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(weatherInfoProps)).isRequired,
  hourlyData: PropTypes.arrayOf(PropTypes.shape(weatherInfoProps)).isRequired,
};
