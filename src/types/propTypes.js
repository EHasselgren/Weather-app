import PropTypes from "prop-types";

export const weatherInfoProps = {
  temperature: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  condition: PropTypes.string.isRequired,
};

export const cityMapProps = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};

export const citySelectorProps = {
  selectedCity: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const errorDisplayProps = {
  message: PropTypes.string.isRequired,
};

export const weatherNavProps = {
  activeKey: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export const weatherCardProps = {
  weather: PropTypes.shape(weatherInfoProps).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  selectedCity: PropTypes.string.isRequired,
  setSelectedCity: PropTypes.func.isRequired,
};

// DailyForecast PropTypes
const dayPropType = PropTypes.shape({
  dt: PropTypes.number.isRequired,
  temp: PropTypes.shape({
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired
  }).isRequired,
  weather: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired
  })).isRequired,
  pop: PropTypes.number
});

export const DailyForecast = {
  data: PropTypes.arrayOf(dayPropType).isRequired,
  hourlyData: PropTypes.arrayOf(PropTypes.shape({
    dt: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired
  })).isRequired
};


 export const TemperatureChart = {
  hourlyData: PropTypes.arrayOf(PropTypes.shape({
    temp: PropTypes.number.isRequired
  })).isRequired
};