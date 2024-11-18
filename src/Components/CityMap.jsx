import { cityMapProps } from '../types/propTypes';
import { useState, useEffect } from 'react';

export const CityMap = ({ lat, lon }) => {
  const [dimensions, setDimensions] = useState({ width: 288, height: 200 });
  
  useEffect(() => {
    const updateMapSize = () => {
      const cardElement = document.querySelector('.map-container');
      if (cardElement) {
        let containerWidth = cardElement.offsetWidth;
        // Handle smaller screens (like iPhone SE)
        if (window.innerWidth <= 400) {
          containerWidth = Math.min(containerWidth, 250);
        }
        const newHeight = Math.floor((containerWidth * 2) / 3);
        setDimensions({
          width: containerWidth,
          height: newHeight
        });
      }
    };

    updateMapSize();
    window.addEventListener('resize', updateMapSize);
    
    return () => {
      window.removeEventListener('resize', updateMapSize);
    };
  }, []);

  const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
  const params = {
    center: `${lat},${lon}`,
    zoom: '10',
    size: `${dimensions.width}x${dimensions.height}`,
    language: 'sv',
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  };

  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return (
    <div className="map-container w-100 position-relative">
      <div style={{ paddingTop: '66.67%' }}>
        <img
          src={`${baseUrl}?${queryString}`}
          alt={`Map view of ${lat},${lon}`}
          className="position-absolute top-0 start-0 w-100 h-100 rounded"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

CityMap.propTypes = cityMapProps;

export default CityMap;