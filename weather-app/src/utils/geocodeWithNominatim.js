// Nominatim has usage policies, so for production use, you should implement proper rate limiting and caching.
function geocodeWithNominatim(address) {
    return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          throw new Error('No results found');
        }
        
        return {
          lat: data[0].lat,
          lng: data[0].lon
        };
      });
  }
  
  // Example usage:
  geocodeWithNominatim('Turning Torso, Malmo, Sverige')
    .then(coords => {
      console.log(`Coordinates: ${coords.lat}, ${coords.lng}`);
    })
    .catch(error => {
      console.error('Geocoding error:', error.message);
    });
  
  async function example(address) {
    try {
        const coords = await geocodeWithNominatim(address);
        console.log(`Coordinates: ${coords.lat}, ${coords.lng}`);
    } catch (error) {
        console.error('Geocoding error:', error.message);
    }
  }
  example('Bollerup, Sverige');
  