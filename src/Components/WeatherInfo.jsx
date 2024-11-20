import { weatherInfoProps } from "../types/propTypes";
import { interpretCondition } from "../utils/WeatherUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const WeatherInfo = ({ temperature, windSpeed, condition }) => {
  const weatherInfo = interpretCondition(condition);

  return (
    <div>
      <div className="my-2">
        <strong>Temperatur:</strong> {temperature}°C
      </div>
      <div className="mb-2">
        <strong>Vind:</strong> {windSpeed} m/s
      </div>
      <div className="mb-2 d-flex align-items-center">
        <strong className="me-1">Kondition:</strong>
        {weatherInfo.text}
        <FontAwesomeIcon
          icon={weatherInfo.icon}
          className="ms-2"
          style={{
            fontSize: "1rem",
            transform: "translateY(1px)",
          }}
        />
      </div>
    </div>
  );
};

WeatherInfo.propTypes = weatherInfoProps;
