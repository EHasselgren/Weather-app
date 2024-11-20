
import { weatherInfoProps } from "../types/propTypes";
import { interpretCondition } from "../utils/WeatherUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloud, faCloudRain, faCloudShowersHeavy } from "@fortawesome/free-solid-svg-icons";

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
  return { icon, color };
};

export const WeatherInfo = ({ temperature, windSpeed, condition }) => {
  const weatherInfo = interpretCondition(condition);
  const { icon, color } = getWeatherIcon(weatherInfo.text);

  return (
    <div>
      <div className="my-2">
        <>Temperatur:</> {temperature}°C
      </div>
      <div className="mb-2">
        <>Vind:</> {windSpeed} m/s
      </div>
      <div className="mb-2 d-flex align-items-center">
        <div className="me-1">Kondition:</div>
        {weatherInfo.text}
        <FontAwesomeIcon
          icon={icon}
          className="ms-2"
          style={{
            fontSize: "1rem",
            transform: "translateY(1px)",
            color
          }}
        />
      </div>
    </div>
  );
};

WeatherInfo.propTypes = weatherInfoProps;