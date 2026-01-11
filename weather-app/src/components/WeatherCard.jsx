import React from "react";
import "./WeatherCard.css";

function WeatherCard({ data }) {
  const { name, main, weather, wind, sys, visibility } = data;

  const getWeatherEmoji = (main) => {
    const emojis = {
      Clear: "☀️",
      Clouds: "☁️",
      Rain: "🌧️",
      Drizzle: "🌦️",
      Thunderstorm: "⛈️",
      Snow: "❄️",
      Mist: "🌫️",
      Smoke: "💨",
      Haze: "🌫️",
      Dust: "💨",
      Fog: "🌫️",
      Sand: "💨",
      Ash: "🌋",
      Squall: "💨",
      Tornado: "🌪️"
    };
    return emojis[main] || "🌈";
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="weather-card premium-weather-card">
      {/* Header Section */}
      <div className="weather-header">
        <div className="location-info">
          <div className="location-pin">📍</div>
          <div>
            <h2 className="city-name">{name}</h2>
            <p className="country-code">{sys.country}</p>
          </div>
        </div>
        <div className="current-temp">
          <div className="temperature">{Math.round(main.temp)}°</div>
          <div className="weather-type">
            <span className="weather-emoji">{getWeatherEmoji(weather[0].main)}</span>
            <span className="weather-desc">{weather[0].description}</span>
          </div>
        </div>
      </div>

      {/* Weather Grid */}
      <div className="weather-grid">
        <div className="weather-item">
          <div className="item-icon">🌡️</div>
          <div className="item-info">
            <label>Feels Like</label>
            <span>{Math.round(main.feels_like)}°C</span>
          </div>
        </div>
        
        <div className="weather-item">
          <div className="item-icon">💧</div>
          <div className="item-info">
            <label>Humidity</label>
            <span>{main.humidity}%</span>
          </div>
        </div>
        
        <div className="weather-item">
          <div className="item-icon">💨</div>
          <div className="item-info">
            <label>Wind Speed</label>
            <span>{wind.speed} m/s</span>
          </div>
        </div>
        
        <div className="weather-item">
          <div className="item-icon">📊</div>
          <div className="item-info">
            <label>Pressure</label>
            <span>{main.pressure} hPa</span>
          </div>
        </div>
        
        <div className="weather-item">
          <div className="item-icon">👁️</div>
          <div className="item-info">
            <label>Visibility</label>
            <span>{(visibility / 1000).toFixed(1)} km</span>
          </div>
        </div>
        
        <div className="weather-item">
          <div className="item-icon">🔺</div>
          <div className="item-info">
            <label>High</label>
            <span>{Math.round(main.temp_max)}°C</span>
          </div>
        </div>
        
        <div className="weather-item">
          <div className="item-icon">🔻</div>
          <div className="item-info">
            <label>Low</label>
            <span>{Math.round(main.temp_min)}°C</span>
          </div>
        </div>
        
        <div className="weather-item">
          <div className="item-icon">🌅</div>
          <div className="item-info">
            <label>Sunrise</label>
            <span>{formatTime(sys.sunrise)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;