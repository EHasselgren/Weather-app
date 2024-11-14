import { Form } from 'react-bootstrap';
import { cities } from '../data/cities';
import { citySelectorProps } from '../types/propTypes';

export const CitySelector = ({ selectedCity, onChange }) => (
    <Form.Select
        aria-label="Select city"
        className="my-3"
        onChange={onChange}
        value={selectedCity}
    >
        {Object.keys(cities).map((city) => (
            <option key={city} value={city}>
                {city}
            </option>
        ))}
    </Form.Select>
);

CitySelector.propTypes = citySelectorProps;