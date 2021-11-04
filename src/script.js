function formatTime(time) {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let dayIndex = time.getDay();

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = weekDays[dayIndex];

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedTime = `${day} | ${hours}:${minutes}`;

  return formattedTime;
}

function showTemperature(response) {
  console.log(response);
  let temperatureElement = response.data.main.temp;
  let currentTemperature = Math.round(temperatureElement);
  let temperature = document.querySelector("#today-temperature");
  temperature.innerHTML = currentTemperature;

  let minTemperatureElement = Math.round(response.data.main.temp_min);
  let maxTemperatureElement = Math.round(response.data.main.temp_max);
  let weatherDescriptionElement = response.data.weather[0].description;
  let windSpeedElement = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#today-weather-icon");

  let temperatureInterval = document.querySelector("#temperature-interval");
  temperatureInterval.innerHTML = `${minTemperatureElement}°C | ${maxTemperatureElement}°C`;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = weatherDescriptionElement;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind speed: ${windSpeedElement} km/h`;

  let iconImage = response.data.weather[0].icon;
  let iconDescription = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconImage}@2x.png`
  );
  iconElement.setAttribute("alt", iconDescription);
}

function search(city) {
  let apiKey = "73a00877081bd43422bdee0f3022beb5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-city-input");
  search(searchedCity.value);
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = searchedCity.value;
}

function changeToCelsius(event) {
  event.preventDefault();
  let todayTemperature = document.querySelector("#today-temperature");
  console.log(`Today's temperature is ${todayTemperature}`);
  todayTemperature.innerHTML = 16;
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let todayTemperature = document.querySelector("#today-temperature");
  todayTemperature.innerHTML = 61;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "73a00877081bd43422bdee0f3022beb5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let dateElement = document.querySelector("#current-time");
let currentTime = new Date();
dateElement.innerHTML = formatTime(currentTime);

let searchedCityForm = document.querySelector("#search-city-form");
searchedCityForm.addEventListener("submit", handleSubmit);

searchCity("Porto");

let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
celsiusLink.addEventListener("click", changeToCelsius);
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);
