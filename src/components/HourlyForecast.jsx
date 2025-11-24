function HourlyForecast({ data }) {
  if (!data || !data.data || data.data.length === 0) {
    return null
  }
  
  const hourlyForecasts = data.data.slice(0, 24)

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="mt-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">24-Hour Forecast</h3>
      
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4">
          {hourlyForecasts.map((hour, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-xs text-gray-600 mb-1 font-semibold">
                {index === 0 ? 'Now' : formatTime(hour.timestamp_local)}
              </div>
              {index > 0 && (
                <div className="text-xs text-gray-500 mb-2">
                  {formatDate(hour.timestamp_local)}
                </div>
              )}
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {Math.round(hour.temp || 0)}°
              </div>
              <div className="text-xs text-gray-600 mb-2 line-clamp-2 min-h-[2.5rem]">
                {hour.weather?.description || 'N/A'}
              </div>
              <div className="text-xs text-gray-500 space-y-0.5">
                <div>💧 {hour.rh || 0}%</div>
                <div>💨 {hour.wind_spd ? hour.wind_spd.toFixed(1) : 0} m/s</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HourlyForecast

