import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";

export default function WeatherApp() {
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const apiKey = "441d7aa10d24e837ebc6104f170a90f1";
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setCurrentWeather(data);
        });
    });
  }, []);

  const weatherIconUrl =
    currentWeather && currentWeather.weather
      ? `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`
      : "";

  return (
    <div>
      <Draggable>
        <div className="weather-container">
          {currentWeather && currentWeather.weather && (
            <>
              <div className="temperature">
                <img
                  className="weather-icon"
                  src={weatherIconUrl}
                  alt="Weather Icon"
                />
                <p className="current-temp">
                  {Math.round(currentWeather.main.temp)}º
                </p>
              </div>
              <h1 className="currentWeather-name">{currentWeather.name}</h1>
            </>
          )}
        </div>
      </Draggable>
    </div>
  );
}
