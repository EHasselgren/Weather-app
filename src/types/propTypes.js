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

export const weatherCardProps = {
  weather: PropTypes.shape(weatherInfoProps),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  selectedCity: PropTypes.string.isRequired,
  setSelectedCity: PropTypes.func.isRequired,
};
