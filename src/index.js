let now = new Date();
let date = document.querySelector("#today");
date.innerHTML = now;

function celToF() {
  let cTemp = document.querySelector("#temp");
  let temp = cTemp.innerHTML;
  cTemp.innerHTML = (temp * 9) / 5 + 32;
}
let cels = document.querySelector("#cel");
cels.addEventListener("click", ferToC);

function ferToC() {
  let fToCel = document.querySelector("#temp");
  let temp = fToCel.innerHTML;
  fToCel.innerHTML = ((temp - 32) * 5) / 9;
}

let fers = document.querySelector("#fer");
fers.addEventListener("click", celToF);

function showWeather(response) {
  console.log(response);
  let outputCity = document.querySelector("#country");
  outputCity.innerHTML = response.data.name;

  let outputTemp = document.querySelector("#temp");
  outputTemp.innerHTML = Math.round(response.data.main.temp);

  let outputHumidity = document.querySelector("#humidity");
  outputHumidity.innerHTML = Math.round(response.data.main.humidity);

  let outputWind = document.querySelector("#windSpeed");
  outputWind.innerHTML = Math.round(response.data.wind.speed);

  let outputCondition = document.querySelector("#condition");
  outputCondition.innerHTML = response.data.weather[0].description;
}

function getCity(city) {
  let apiKey = "8b9afaa73ea20e1e994a07480018c73c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function inputSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  getCity(city);
}
let form = document.querySelector("#form-input");
form.addEventListener("submit", inputSubmit);

function currentLocation(position) {
  console.log(position);
  let apiKey = "bc77907b0e11a419a6d57d1e95e42bea";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function searchCurrrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let button = document.querySelector("#current");
button.addEventListener("click", searchCurrrentLocation);