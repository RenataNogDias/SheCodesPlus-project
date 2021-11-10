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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let dayIndex = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayIndex];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          ${formatDay(forecastDay.dt)}
          <br />
          <img 
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" 
            alt="storm icon" 
            class="img-forecast"
          >
          <br />
            <span class="weather-forecast-temperature-min">
              ${Math.round(forecastDay.temp.min)}º
            </span> 
            | 
            <span class="weather-forecast-temperature-max">
              ${Math.round(forecastDay.temp.max)}º
            </span> 
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiKey = "73a00877081bd43422bdee0f3022beb5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = currentTemperature;

  let minTemperature = Math.round(response.data.main.temp_min);
  let maxTemperature = Math.round(response.data.main.temp_max);
  let weatherDescription = response.data.weather[0].description;
  let windSpeed = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#today-weather-icon");

  let temperatureInterval = document.querySelector("#temperature-interval");
  temperatureInterval.innerHTML = `${minTemperature}°C | ${maxTemperature}°C`;

  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = weatherDescription;

  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `Wind speed: ${windSpeed} km/h`;

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

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "73a00877081bd43422bdee0f3022beb5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

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

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

search("Porto");
