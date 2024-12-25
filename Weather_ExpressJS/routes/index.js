var express = require("express");
var router = express.Router();
const { fetchWeatherApi } = require("openmeteo");
const axios = require("axios").default;

router.get("/", async function (req, res, next) {
  const url = "https://api.open-meteo.com/v1/forecast";
  const params = {
    latitude: 16.8053,
    longitude: 96.1561,
    current: "temperature_2m,rain,showers,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset",
    timezone: "Asia/Bangkok",
    forecast_days: 3,
  };
  //const response = await fetchWeatherApi(url, params);
  const response = await axios.get(url, { params });
  console.log(response);
  //   const data = await response.json();
  //   console.log(data);
  //   const weatherData = {
  //     temperature: data.list.map((day) => ({
  //       date: day.date,
  //       temperature: day.temperature.main.value + "°C",
  //       windspeed: day.wind.speed.value + " KM/H",
  //     })),
  //   };
  //   res.json(weatherData);
  res.json(response.data);
});

module.exports = router;
