import { Card } from 'react-bootstrap';
import { weatherInfoProps } from '../types/propTypes';

export const WeatherInfo = ({ temperature, windSpeed, condition }) => (
    <Card.Text>
        <div className="mb-2">
            <strong>Temperatur:</strong> {temperature}°C
        </div>
        <div className="mb-2">
            <strong>Vind:</strong> {windSpeed} m/s
        </div>
        <div className="mb-2">
            <strong>Kondition:</strong> {condition}
        </div>
    </Card.Text>
);

WeatherInfo.propTypes = weatherInfoProps;