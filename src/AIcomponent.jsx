// import React, { useState } from "react";

// const API_KEY = "AIzaSyC7suaIIMRMHltSIhnO19a_4UCMczqxmt8"; // Replace with your API Key
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// const AIComponent = () => {
//   const [input, setInput] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     if (!input.trim()) return;

//     setLoading(true);
//     setResponse("");

//     try {
//       const requestBody = {
//         contents: [{ parts: [{ text: input }] }],
//       };

//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestBody),
//       });

//       const data = await res.json();
//       if (data && data.candidates) {
//         setResponse(data.candidates[0]?.content?.parts[0]?.text || "No response");
//       } else {
//         setResponse("Error: Invalid response from API");
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       setResponse("Error connecting to AI.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
//       <h2>MY AI Chat</h2>
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Ask AI something..."
//         style={{ width: "80%", padding: "10px" }}
//       />
//       <button onClick={handleGenerate} style={{ marginLeft: "10px", padding: "10px" }}>
//         {loading ? "Thinking..." : "Generate"}
//       </button>
//       <div style={{ marginTop: "20px", textAlign: "left" }}>
//         <strong>Response:</strong>
//         <p>{response}</p>
//       </div>
//     </div>
//   );
// };

// export default AIComponent;
import React, { useState, useEffect } from "react";
 // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_API_KEY}`;

const AIComponent = ({ weatherData }) => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (weatherData) {
      fetchAIResponse();
    }
  }, [weatherData]);

  const fetchAIResponse = async () => {
    setLoading(true);
    setResponse("");
  
    try {
      const temperature = weatherData.main.temp;
      const weatherCondition = weatherData.weather[0].main;
      
      const input = `
        The temperature in ${weatherData.name}, ${weatherData.sys.country} is ${temperature}°C with ${weatherCondition} conditions.
        Based on the temperature, provide recommendations:
        - What type of clothing should a person wear?
        - Should they stay indoors or go outside?
        - Any health precautions (hydration, sunscreen, layering, etc.)?
        - Suggested activities based on the temperature.
        - Should they carry any specific items (umbrella, sunglasses, scarf, etc.)?
      `;
  
      const requestBody = { contents: [{ parts: [{ text: input }] }] };
  
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      const data = await res.json();
      setResponse(data.candidates?.[0]?.content?.parts?.[0]?.text || "No AI response available.");
    } catch (error) {
      console.error("API Error:", error);
      setResponse("Error connecting to AI.");
    }
  
    setLoading(false);
  };
  

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
        return "🌧️";
      case "Thunderstorm":
        return "⛈️";
      case "Snow":
        return "❄️";
      case "Drizzle":
        return "🌦️";
      default:
        return "🌍";
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🌤 AI Weather Advisor</h2>

      {weatherData ? (
        <div style={styles.weatherCard}>
          <h3 style={styles.city}>
            {weatherData.name}, {weatherData.sys.country} {getWeatherIcon(weatherData.weather[0].main)}
          </h3>
          <p><strong>🌡️ Temperature:</strong> {weatherData.main.temp}°C</p>
          <p><strong>💨 Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
          <p><strong>☁️ Condition:</strong> {weatherData.weather[0].description}</p>
          <p><strong>🌅 Sunrise:</strong> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p><strong>🌇 Sunset:</strong> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      ) : (
        <p style={styles.errorText}>❗ Please search for the weather first.</p>
      )}

      {loading ? (
        <p style={styles.loadingText}>⏳ AI is analyzing the weather...</p>
      ) : (
        response && (
          <div style={styles.aiBox}>
            <h3>🧠 AI Suggestions:</h3>
            <p>{response}</p>
          </div>
        )
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    background: "linear-gradient(135deg, #2c3e50, #4ca1af)",
    color: "white",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  weatherCard: {
    padding: "15px",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    backdropFilter: "blur(5px)",
  },
  city: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff4d4d",
    fontWeight: "bold",
  },
  loadingText: {
    color: "#ffcc00",
    fontWeight: "bold",
  },
  aiBox: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    animation: "fadeIn 1s ease-in-out",
  },
};

export default AIComponent;
