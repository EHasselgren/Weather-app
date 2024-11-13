import { useState } from 'react';

const GeocodingComponent = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const geocodeWithNominatim = async (searchAddress) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}`
      );
      const data = await response.json();

      if (data.length === 0) {
        throw new Error('No results found');
      }

      return {
        lat: data[0].lat,
        lng: data[0].lon
      };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const coords = await geocodeWithNominatim(address);
      setCoordinates(coords);
    } catch (err) {
      setError(err.message);
      setCoordinates(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter an address"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red' }}>
          Error: {error}
        </div>
      )}

      {coordinates && (
        <div>
          <h3>Coordinates:</h3>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>
        </div>
      )}
    </div>
  );
};

export default GeocodingComponent;
