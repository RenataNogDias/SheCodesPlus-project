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

function showForecast(response) {
  console.log(response.data.daily);

  let forecast = document.querySelector("#weather-forecast");

  let days = [
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
  ];

  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
        ${day}
        <br />
        <img src="images/storm.svg" alt="storm icon" class="img-forecast">
        <br />
          <span class="weather-forecast-temperature-min">
            15ºC
          </span> 
          | 
          <span class="weather-forecast-temperature-max">
            24ºC
          </span> 
      </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiKey = "73a00877081bd43422bdee0f3022beb5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);

  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
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

  let city = document.querySelector("#city-element");
  let cityName = response.data.name;

  city.innerHTML = cityName;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "73a00877081bd43422bdee0f3022beb5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-city-input");
  search(searchedCity.value);
}

function changeToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let todayTemperature = document.querySelector("#today-temperature");
  todayTemperature.innerHTML = Math.round(celsiusTemperature);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
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
