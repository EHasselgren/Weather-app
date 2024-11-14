import { cityMapProps } from '../types/propTypes';

export const CityMap = ({ lat, lon }) => (
    <iframe
        title="City Map"
        width="100%"
        height="150"
        src={`https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&center=${lat},${lon}&zoom=10`}
        style={{ border: 0 }}
        allowFullScreen
    ></iframe>
);

CityMap.propTypes = cityMapProps;