var express = require("express");
var router = express.Router();
const axios = require("axios").default;

async function fetchWeatherApi() {
  var lat = 16.91;
  var long = 96.15;
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok&forecast_days=5`
    );
    return response.data; // Axios automatically parses the response data
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

router.get("/", async function (req, res, next) {
  try {
    const responses = await fetchWeatherApi();
    console.log(responses);

    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds;
    const timezone = response.timezone;
    const timezoneAbbreviation = response.timezoneAbbreviation;
    const latitude = response.latitude;
    const longitude = response.longitude;
    const hourly = response.hourly;

    const weatherData = {
      hourly,
      timezone,
      timezoneAbbreviation,
      latitude,
      longitude,
      daily: response.daily,
    };

    console.log(weatherData);

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
