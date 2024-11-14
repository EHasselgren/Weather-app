import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { cities } from '../../data/Cities';

export function CitySelector({ selectedCity, onCityChange }) {
    return (
        <Form.Select
            aria-label="Select city"
            className="my-3"
            onChange={e => onCityChange(e.target.value)}
            value={selectedCity}
        >
            {Object.keys(cities).map((city) => (
                <option key={city} value={city}>{city}</option>
            ))}
        </Form.Select>
    );
}

CitySelector.propTypes = {
    selectedCity: PropTypes.string.isRequired,
    onCityChange: PropTypes.func.isRequired
};