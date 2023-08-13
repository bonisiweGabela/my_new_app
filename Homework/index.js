function now(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];

  return `${day} ${hours}: ${minutes}`;
}

function showWeather(response) {
  let cityEntered = document.querySelector("#city");
  cityEntered.innerHTML = response.data.name;

  let temperatureValue = document.querySelector("#temperature");
  temperatureValue.innerHTML = Math.round(response.data.main.temp);

  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = response.data.main.humidity;

  let windValue = document.querySelector("#wind");
  windValue.innerHTML = Math.round(response.data.wind.speed);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "c003eb643e8a74e1be5a0cbd43fca4cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c003eb643e8a74e1be5a0cbd43fca4cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let date = document.querySelector("#date");
let currentTime = new Date();
date.innerHTML = now(currentTime);

let form = document.querySelector("#search-form");
form.addEventListener("submit", cityInput);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Durban");
