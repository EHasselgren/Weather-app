import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export function WeatherInfo({ weather }) {
    return (
        <Card.Text>
            <div className="mb-2">
                <strong>Temperatur:</strong> {weather.temperature}°C
            </div>
            <div className="mb-2">
                <strong>Vind:</strong> {weather.windSpeed} m/s
            </div>
            <div className="mb-2">
                <strong>Kondition:</strong> {weather.condition}
            </div>
        </Card.Text>
    );
}

WeatherInfo.propTypes = {
    weather: PropTypes.shape({
        temperature: PropTypes.number.isRequired,
        windSpeed: PropTypes.number.isRequired,
        condition: PropTypes.string.isRequired
    }).isRequired
};