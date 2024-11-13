import PropTypes from 'prop-types';
import { Form } from "react-bootstrap";
import { cities } from "../data/Cities";

export const CitySelector = ({ selectedCity, onCityChange }) => (
  <Form.Select
    aria-label="Select city"
    className="my-3"
    onChange={onCityChange}
    value={selectedCity}
  >
    {Object.keys(cities).map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ))}
  </Form.Select>
);

CitySelector.propTypes = {
  selectedCity: PropTypes.string.isRequired,
  onCityChange: PropTypes.func.isRequired
};