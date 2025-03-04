import React, { useState } from "react";
import WeatherComponent from "./WeatherComponent";
import AIComponent from "./AIcomponent";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div>
      <WeatherComponent setWeatherData={setWeatherData} />
      <AIComponent weatherData={weatherData} />
    </div>
  );
};

export default App;
