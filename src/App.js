import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=1dcf6d3e16916066347bbc71ba8c8754`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{(((data.main.temp - 32) * 5) / 9).toFixed()}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <>
            <div className="bottom" style={{ marginTop: "120px" }}>
              <div className="feels">
                {data.main ? (
                  <p className="bold">
                    {(((data.main.feels_like - 32) * 5) / 9).toFixed()}°C
                  </p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="bottom" style={{ marginTop: "-10px" }}>
              <div className="feels">
                {data.main ? <p className="bold">{data.sys.country}</p> : null}
                <p>Country</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">
                    {new Date(
                      (data.dt + data.timezone) * 1000
                    ).toLocaleTimeString("en-US", { timeZone: "UTC" })}
                  </p>
                ) : null}
                <p>Time Zone</p>
              </div>
              <div className="wind">
                {data.sys && (
                  <p className="bold">
                    {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                )}
                <p>Sunrise</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
