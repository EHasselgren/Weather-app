import { cityMapProps } from '../types/propTypes';

export const CityMap = ({ lat, lon }) => {
    
    const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
    const params = {
      center: `${lat},${lon}`,
      zoom: '10',
      size: '255x200', 
      language: 'sv', 
      key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    };
  
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
  
    return (
      <div>
        <img
          src={`${baseUrl}?${queryString}`}
          alt={`Map view of ${lat},${lon}`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

CityMap.propTypes = cityMapProps;