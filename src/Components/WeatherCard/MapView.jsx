import PropTypes from 'prop-types';
import { cities } from '../../data/Cities';

export function MapView({ selectedCity }) {
    return (
        <iframe
            title="City Map"
            width="100%"
            height="150"
            src={`https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&center=${cities[selectedCity].lat},${cities[selectedCity].lon}&zoom=10`}
            style={{ border: 0 }}
            allowFullScreen
        />
    );
}

MapView.propTypes = {
    selectedCity: PropTypes.string.isRequired
};