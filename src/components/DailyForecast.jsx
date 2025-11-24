function DailyForecast({ data }) {
  if (!data || !data.data || data.data.length === 0) {
    return null
  }

  const dailyForecasts = data.data

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const forecastDate = new Date(date)
    forecastDate.setHours(0, 0, 0, 0)
    
    const diffTime = forecastDate - today
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
    }
  }

  const getWeatherIcon = (code) => {
    return '🌤️'
  }

  return (
    <div className="mt-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">7-Day Forecast</h3>
      
      <div className="space-y-3">
        {dailyForecasts.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="text-3xl">
                {day.weather?.icon ? (
                  <img 
                    src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
                    alt={day.weather.description}
                    className="w-10 h-10"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'block'
                    }}
                  />
                ) : null}
                <span style={{ display: 'none' }}>🌤️</span>
              </div>
              
              <div className="flex-1">
                <div className="font-semibold text-gray-800 text-lg">
                  {formatDate(day.valid_date)}
                </div>
                <div className="text-sm text-gray-600">
                  {day.weather?.description || 'N/A'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">High / Low</div>
                <div className="text-xl font-bold text-gray-800">
                  {Math.round(day.max_temp)}° / {Math.round(day.min_temp)}°
                </div>
              </div>
              
              <div className="text-right min-w-[100px]">
                <div className="text-xs text-gray-600 space-y-1">
                  <div>💧 {day.rh}%</div>
                  <div>💨 {day.wind_spd?.toFixed(1)} m/s</div>
                  <div>☔ {day.precip || 0}mm</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyForecast




