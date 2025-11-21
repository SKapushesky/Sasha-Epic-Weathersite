// Weatherbit API config
const API_KEY = '3999745808bf4e4d92e054d8dde62752';
const API_BASE_URL = 'https://api.weatherbit.io/v2.0/current';

// Function to fetch weather data
async function getWeather(city) {
  try {
    const params = new URLSearchParams({
      city: city,
      key: API_KEY
    });

    const response = await fetch(`${API_BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Weather Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
}

// Example usage - fetch weather for a city
getWeather('New York');