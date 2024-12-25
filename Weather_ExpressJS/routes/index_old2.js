var express = require("express");
var router = express.Router();
const { fetchWeatherApi } = require("openmeteo");
const axios = require("axios").default;

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const params = {
    latitude: 16.8053,
    longitude: 96.1561,
    current: ["temperature_2m", "rain", "showers", "weather_code"],
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "weather_code",
      "sunrise",
      "sunset",
    ],
    timezone: "Asia/Bangkok",
    forecast_days: 3,
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const url2 = "https://api.open-meteo.com/v1/forecast?latitude=16.8053&longitude=96.1561&current=temperature_2m,rain,showers,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FBangkok&forecast_days=3";
  const responses = await fetchWeatherApi(url, params);
  //console.log(responses);
  const responses2 = await axios.get(url2);
  console.log(responses2);
  // Helper function to form time ranges
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];
  //console.log(response);
  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const current = response.current();
  const daily = response.daily();

  const weatherData = {
    current,
    timezone,
    timezoneAbbreviation,
    utcOffsetSeconds,
    latitude,
    longitude,
    daily,
  };
  //console.log(weatherData);

  res.json(weatherData);
});

module.exports = router;
