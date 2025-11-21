function WeatherCard({ data }) {
  if (!data || !data.data || data.data.length === 0) {
    return null
  }

  const weather = data.data[0]
  const {
    city_name,
    country_code,
    app_temp,
    temp,
    weather: weatherInfo,
    rh,
    wind_spd,
    wind_dir,
    pres,
    vis
  } = weather

  return (
    <div className="mt-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">
          {city_name}, {country_code}
        </h2>
        <p className="text-gray-600 text-lg">{weatherInfo?.description || 'N/A'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-sm font-medium mb-2 opacity-90">Feels Like</div>
          <div className="text-5xl font-bold mb-2">{app_temp}°C</div>
          <div className="text-lg opacity-80">Actual: {temp}°C</div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Humidity</div>
            <div className="text-2xl font-semibold text-gray-800">{rh}%</div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Wind Speed</div>
            <div className="text-2xl font-semibold text-gray-800">
              {wind_spd} m/s {wind_dir}°
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Pressure</div>
          <div className="text-xl font-semibold text-gray-800">{pres} mb</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Visibility</div>
          <div className="text-xl font-semibold text-gray-800">{vis} km</div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard

