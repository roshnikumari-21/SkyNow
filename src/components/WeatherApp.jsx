import React, { useState } from "react";  

const WeatherApp = () => {  
  const [city, setCity] = useState("");  
  const [weather, setWeather] = useState(null);  
  const [error, setError] = useState(false);  

  const apikey = import.meta.env.VITE_API_KEY;  

  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";  

  const checkWeather = async () => {  
    try {  
      const response = await fetch(`${apiUrl}${city}&appid=${apikey}`);  
      
      if (!response.ok) {  
        setError(true);  
        setWeather(null);  
        console.error("Error fetching weather data:", await response.json());  
        return;  
      }  
      
      const data = await response.json();  
      console.log("Weather Data:", data); // Check the structure  
      setWeather(data);  
      setError(false);  
    } catch (err) {  
      console.error("Fetch error:", err);  
      setError(true);  
    }  
  };  

  return (  
    <div className="container p-5">  
      <div className="row">  
        <div className="col-10">  
          <input  
            type="text"  
            className="w-100"  
            placeholder="Enter city name"  
            value={city}  
            onChange={(e) => setCity(e.target.value)}  
          />  
        </div>  
        <div className="col-2">  
          <button onClick={checkWeather}>Check Weather</button>  
        </div>  
      </div>  

      {/* Show error only when there's an error */}  
      {error && (  
        <div className="error">  
          <p>Invalid City Name or Unauthorized Access</p>  
        </div>  
      )}  

      {/* Show weather only when the weather data exists */}  
      {weather && (  
        <div className="weather">  
          <h1>{weather.name}</h1>  
          <h2>{Math.round(weather.main.temp)}°C</h2>  
          {weather.weather && weather.weather.length > 0 && (  
            <div>  
              <img  
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}  
                alt={weather.weather[0].description}  
              />  
              <p>{weather.weather[0].description}</p>  
            </div>  
          )}  
        </div>  
      )}  
    </div>  
  );  
};  

export default WeatherApp;