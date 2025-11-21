import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (city) => {
    if (!city.trim()) return
    
    setLoading(true)
    setError(null)
    setWeatherData(null)

    try {
      const API_KEY = '3999745808bf4e4d92e054d8dde62752'
      const API_BASE_URL = 'https://api.weatherbit.io/v2.0/current'
      
      const params = new URLSearchParams({
        city: city,
        key: API_KEY
      })

      const response = await fetch(`${API_BASE_URL}?${params}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Weather Data:', data)
      setWeatherData(data)
    } catch (err) {
      console.error('Error fetching weather:', err)
      setError(err.message || 'Failed to fetch weather data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Sasha's Epic Weather Site
          </h1>
          <p className="text-xl text-blue-100">
            Real time weather information all around the world
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} loading={loading} />
          
          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <p className="mt-4 text-white text-lg">Loading weather data...</p>
            </div>
          )}

          {error && (
            <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {weatherData && !loading && (
            <WeatherCard data={weatherData} />
          )}

          {!weatherData && !loading && !error && (
            <div className="mt-8 text-center">
              <p className="text-white text-lg">
                Enter a city name to get the weather information
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

