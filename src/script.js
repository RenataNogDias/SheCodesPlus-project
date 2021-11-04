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
  celsiusTemperature = response.data.main.temp;
  let currentTemperature = Math.round(celsiusTemperature);
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
  todayTemperature.innerHTML = Math.round(celsiusTemperature);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let todayTemperature = document.querySelector("#today-temperature");
  todayTemperature.innerHTML = fahrenheitTemperature;
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

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

search("Porto");
