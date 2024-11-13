import PropTypes from 'prop-types';

export const GoogleMap = ({ lat, lon }) => (
  <iframe
    title="City Map"
    width="100%"
    height="150"
    src={`https://www.google.com/maps/embed/v1/view?key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }&center=${lat},${lon}&zoom=10`}
    style={{ border: 0 }}
    allowFullScreen
  />
);

GoogleMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired
};