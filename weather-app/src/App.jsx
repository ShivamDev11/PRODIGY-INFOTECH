import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

const API_KEY = "afb2a1471ae989a923592c36d9ebeba6";

function App() {
  const [city, setCity] = useState("Mumbai");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentCondition, setCurrentCondition] = useState("default");
  const [isListening, setIsListening] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [voiceSearchText, setVoiceSearchText] = useState("");
  
  const recognitionRef = useRef(null);

  // Gradient backgrounds for different weather conditions
  const backgrounds = {
    clear: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    clouds: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    rain: "linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)",
    drizzle: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    thunderstorm: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
    snow: "linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)",
    mist: "linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)",
    smoke: "linear-gradient(135deg, #485563 0%, #29323c 100%)",
    haze: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)",
    dust: "linear-gradient(135deg, #b79891 0%, #94716b 100%)",
    fog: "linear-gradient(135deg, #636fa4 0%, #a8c0ff 100%)",
    sand: "linear-gradient(135deg, #decba4 0%, #3e5151 100%)",
    ash: "linear-gradient(135deg, #868f96 0%, #596164 100%)",
    squall: "linear-gradient(135deg, #29323c 0%, #485563 100%)",
    tornado: "linear-gradient(135deg, #2c3e50 0%, #fd746c 100%)",
    default: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  };

  // Function to clean and process voice input - IMPROVED VERSION
  const processVoiceInput = (transcript) => {
    console.log("Original voice input:", transcript);
    
    let processed = transcript.toLowerCase().trim();
    
    // Remove all punctuation marks including full stops, commas, etc.
    processed = processed.replace(/[.,!?;:]/g, '');
    
    // Remove common voice command words
    const wordsToRemove = [
      'search', 'for', 'weather', 'in', 'at', 'the', 'city', 'of',
      'find', 'get', 'show', 'me', 'please', 'weather forecast for',
      'temperature', 'forecast', 'what is', 'how is', 'current', 'today'
    ];
  
    wordsToRemove.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      processed = processed.replace(regex, '');
    });
    
    // Clean up multiple spaces and trim
    processed = processed.replace(/\s+/g, ' ').trim();
    
    // If after processing we have nothing, return original without punctuation
    if (!processed || processed.length < 2) {
      processed = transcript.toLowerCase().replace(/[.,!?;:]/g, '').trim();
    }
    
    // Handle common city name variations
    const cityVariations = {
      'delhi': 'Delhi',
      'new delhi': 'New Delhi',
      'mumbai': 'Mumbai',
      'bombay': 'Mumbai',
      'kolkata': 'Kolkata',
      'calcutta': 'Kolkata',
      'chennai': 'Chennai',
      'madras': 'Chennai',
      'bangalore': 'Bengaluru',
      'bengaluru': 'Bengaluru',
      'hyderabad': 'Hyderabad',
      'pune': 'Pune',
      'ahmedabad': 'Ahmedabad',
      'jaipur': 'Jaipur',
      'lucknow': 'Lucknow',
      'kanpur': 'Kanpur',
      'nagpur': 'Nagpur',
      'indore': 'Indore',
      'thane': 'Thane',
      'bhopal': 'Bhopal',
      'visakhapatnam': 'Visakhapatnam',
      'patna': 'Patna',
      'vadodara': 'Vadodara',
      'ghaziabad': 'Ghaziabad',
      'ludhiana': 'Ludhiana',
      'agra': 'Agra',
      'nashik': 'Nashik'
    };
    
    // Check if processed city matches any known variations
    if (cityVariations[processed]) {
      processed = cityVariations[processed];
    } else {
      // Capitalize first letter of each word for better API recognition
      processed = processed.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    
    console.log("Processed city name:", processed);
    return processed;
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN'; // Changed to Indian English for better recognition
      recognitionRef.current.maxAlternatives = 3; // Get multiple alternatives

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const processedCity = processVoiceInput(transcript);
        
        console.log("Voice input received:", transcript);
        console.log("Processed city:", processedCity);
        
        if (processedCity && processedCity.length > 1) {
          setCity(processedCity);
          setVoiceSearchText(`🎯 Searching: "${processedCity}"`);
          setTimeout(() => {
            fetchWeather(processedCity);
            setVoiceSearchText("");
          }, 1000);
        } else {
          setVoiceSearchText("❌ Could not understand city name. Please try again.");
          setTimeout(() => setVoiceSearchText(""), 3000);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        let errorMsg = "Voice recognition failed. Try typing instead.";
        
        if (event.error === 'not-allowed') {
          errorMsg = "Microphone access denied. Please allow microphone permission.";
        } else if (event.error === 'no-speech') {
          errorMsg = "No speech detected. Please speak clearly.";
        } else if (event.error === 'audio-capture') {
          errorMsg = "No microphone found. Please check your microphone.";
        }
        
        setVoiceSearchText(`❌ ${errorMsg}`);
        setTimeout(() => setVoiceSearchText(""), 4000);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.log("Speech recognition not supported");
    }

    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setLocationError("");
      setVoiceSearchText("📍 Detecting your location...");
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            if (data.cod === 200) {
              setWeatherData(data);
              setCity(data.name);
              changeBackground(data.weather[0].main.toLowerCase());
              setVoiceSearchText(`✅ Location found: ${data.name}`);
              setTimeout(() => setVoiceSearchText(""), 3000);
            } else {
              throw new Error("Weather data not found");
            }
          } catch (error) {
            console.error("Error fetching weather by location:", error);
            setLocationError("Failed to get weather for your location");
            setVoiceSearchText("❌ Could not get weather for your location");
            setTimeout(() => setVoiceSearchText(""), 3000);
            fetchWeather("Mumbai");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          let errorMessage = "Location access denied. Using default city.";
          if (error.code === error.TIMEOUT) {
            errorMessage = "Location detection timeout. Using default city.";
          }
          setLocationError(errorMessage);
          setVoiceSearchText("❌ " + errorMessage);
          setTimeout(() => setVoiceSearchText(""), 3000);
          setLoading(false);
          fetchWeather("Mumbai");
        },
        {
          timeout: 10000,
          enableHighAccuracy: true
        }
      );
    } else {
      setLocationError("Geolocation not supported by your browser");
      setVoiceSearchText("❌ Geolocation not supported");
      setTimeout(() => setVoiceSearchText(""), 3000);
      fetchWeather("Mumbai");
    }
  };

  const startVoiceSearch = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      setVoiceSearchText("🎤 Listening... Speak the city name clearly");
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting voice recognition:", error);
        setVoiceSearchText("❌ Error starting voice search");
        setTimeout(() => setVoiceSearchText(""), 3000);
        setIsListening(false);
      }
    } else {
      setVoiceSearchText("❌ Voice search not supported in your browser");
      setTimeout(() => setVoiceSearchText(""), 3000);
    }
  };

  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error("Error stopping voice recognition:", error);
      }
      setIsListening(false);
      setVoiceSearchText("⏹️ Voice search stopped");
      setTimeout(() => setVoiceSearchText(""), 2000);
    }
  };

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setVoiceSearchText("❌ Please enter a city name");
      setTimeout(() => setVoiceSearchText(""), 3000);
      return;
    }
    
    setLoading(true);
    setLocationError("");
    setVoiceSearchText(`🔍 Searching for "${cityName}"...`);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        changeBackground(data.weather[0].main.toLowerCase());
        setVoiceSearchText(`✅ Weather found for ${data.name}`);
        setTimeout(() => setVoiceSearchText(""), 3000);
      } else {
        setVoiceSearchText(`❌ City "${cityName}" not found! Try another name.`);
        setTimeout(() => setVoiceSearchText(""), 4000);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      setVoiceSearchText("❌ Network error! Check your connection.");
      setTimeout(() => setVoiceSearchText(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  const changeBackground = (condition) => {
    setCurrentCondition(condition);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setVoiceSearchText("");
    fetchWeather(city);
  };

  return (
    <div 
      className="app-container" 
      style={{ background: backgrounds[currentCondition] || backgrounds.default }}
    >
      <div className="app-glass">
        {/* Header */}
        <div className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              <span className="weather-emoji">🌤️</span>
              WeatherWave
            </h1>
            <p className="app-subtitle">Real-time weather with voice search</p>
          </div>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-container">
            <div className="search-group">
              <div className="search-input-container">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Enter city name..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button 
                  className="voice-btn"
                  type="button"
                  onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                  disabled={loading}
                >
                  {isListening ? '🛑' : '🎤'}
                </button>
              </div>
              <button 
                className="search-button"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  'Get Weather'
                )}
              </button>
            </div>
          </form>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button 
              className="action-btn location-btn"
              onClick={getCurrentLocation}
              disabled={loading}
            >
              <span className="btn-icon">📍</span>
              My Location
            </button>
            <button 
              className={`action-btn voice-btn-large ${isListening ? 'listening' : ''}`}
              onClick={isListening ? stopVoiceSearch : startVoiceSearch}
              disabled={loading}
            >
              <span className="btn-icon">{isListening ? '🛑' : '🎤'}</span>
              {isListening ? 'Stop' : 'Voice Search'}
            </button>
          </div>
        </div>

        {/* Voice Feedback */}
        {voiceSearchText && (
          <div className="voice-feedback">
            <div className="feedback-bubble">
              {voiceSearchText}
              {isListening && <div className="pulse-dots"><span></span><span></span><span></span></div>}
            </div>
          </div>
        )}

        {/* Location Error */}
        {locationError && (
          <div className="error-message">
            ⚠️ {locationError}
          </div>
        )}

        {/* Weather Card */}
        {weatherData && <WeatherCard data={weatherData} />}

        {/* Footer */}
        <div className="app-footer">
          <div className="footer-content">
            <p>Powered by OpenWeatherMap</p>
            <div className="feature-badge">
              <span>🎤 Voice Search</span>
              <span>📍 Auto-Location</span>
              <span>🔊 Hindi/English</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 