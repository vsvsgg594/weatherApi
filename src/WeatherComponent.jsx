// import React from "react";
// import { useState } from "react";
// import './App.css';

// const WeatherComponent=()=>{
//     const [weatherData, setWeatherData] = useState(null);
//   const [city, setCity] = useState('Delhi');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3fe8d78301afde328d649632fb55da6a&units=metric`
//       );
//       const data = await response.json();
//       if (data.cod === 200) {
//         setWeatherData(data);
//       } else {
//         setError('City not found. Please try again.');
//         setWeatherData(null);
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//       console.log("err", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCityChange = (e) => {
//     setCity(e.target.value);
//   };

//   const handleSearch = () => {
//     if (city.trim()) {
//       fetchData();
//     }
//   };

//   const getWeatherIcon = (iconCode) => {
//     return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
//   };

//   return (
//     <div className="App">
//       <div className="container">
//         <h1>Weather App</h1>
//         <div className="search-container">
//           <input
//             type="text"
//             value={city}
//             onChange={handleCityChange}
//             placeholder="Enter city name"
//             onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//           />
//           <button onClick={handleSearch} disabled={loading}>
//             {loading ? 'Searching...' : 'Search'}
//           </button>
//         </div>
//         {error && <p className="error">{error}</p>}
//         {weatherData && weatherData.cod === 200 && (
//           <div className="weather-card">
//             <div className="weather-header">
//               <h2>
//                 {weatherData.name}, {weatherData.sys.country}
//               </h2>
//               <p className="weather-description">
//                 {weatherData.weather[0].description}
//               </p>
//               <img
//                 src={getWeatherIcon(weatherData.weather[0].icon)}
//                 alt={weatherData.weather[0].description}
//               />
//             </div>
//             <div className="weather-details">
//               <div className="detail-item">
//                 <span>🌡️ Temperature</span>
//                 <p>{weatherData.main.temp}°C</p>
//               </div>
//               <div className="detail-item">
//                 <span>🌡️ Feels Like</span>
//                 <p>{weatherData.main.feels_like}°C</p>
//               </div>
//               <div className="detail-item">
//                 <span>📉 Min Temp</span>
//                 <p>{weatherData.main.temp_min}°C</p>
//               </div>
//               <div className="detail-item">
//                 <span>📈 Max Temp</span>
//                 <p>{weatherData.main.temp_max}°C</p>
//               </div>
//               <div className="detail-item">
//                 <span>💧 Humidity</span>
//                 <p>{weatherData.main.humidity}%</p>
//               </div>
//               <div className="detail-item">
//                 <span>🌀 Pressure</span>
//                 <p>{weatherData.main.pressure} hPa</p>
//               </div>
//               <div className="detail-item">
//                 <span>🌬️ Wind Speed</span>
//                 <p>{weatherData.wind.speed} m/s</p>
//               </div>
//               <div className="detail-item">
//                 <span>☁️ Cloudiness</span>
//                 <p>{weatherData.clouds.all}%</p>
//               </div>
//               <div className="detail-item">
//                 <span>🌅 Sunrise</span>
//                 <p>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
//               </div>
//               <div className="detail-item">
//                 <span>🌇 Sunset</span>
//                 <p>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
//               </div>
//               </div>
           
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
// export default  WeatherComponent;

import React, { useState } from "react";
import "./App.css";

const WeatherComponent = ({ setWeatherData }) => {
  const [city, setCity] = useState("Delhi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3fe8d78301afde328d649632fb55da6a&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        setError("City not found. Please try again.");
        setWeatherData(null);
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default WeatherComponent;
