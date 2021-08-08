function formatDate(timestamp) {
  //calculate date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
  let date = new Date(timestamp*1000);
  let day = date.getDay();

  let days = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
  ]

  return days[day];

}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if(index < 6) {
  forecastHtml = 
    forecastHtml + `
    <div class="col-2">
    <div class="weather-forecast-date">
      ${formatDay(forecastDay.dt)}
    </div>
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="36">
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max">
      ${Math.round(forecastDay.temp.max)}
      °
      </span>
      <span class="weather-forecast-temperature-min">
      ${Math.round(forecastDay.temp.min)}
      °
      </span>
    </div>
  </div>
    `;
  }
  })
    forecastHtml = forecastHtml + `</div>`;
    forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  let apiKey = "8b9afaa73ea20e1e994a07480018c73c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  celsTemp = response.data.main.temp;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsTemp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let desElement = document.querySelector("#description");
  desElement.innerHTML = response.data.weather[0].description;
  let humElement = document.querySelector("#humidity");
  humElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");

  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let imgElement = document.querySelector("#icon");
  imgElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  imgElement.setAttribute("alt", response.data.weather[0].description);
   
  getForecast(response.data.coord);

}


function search(city) {
  let apiKey = "8b9afaa73ea20e1e994a07480018c73c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function displayFar(event) {
  event.preventDefault();
  //remove  link from C
  celLink.classList.remove("active");
  farLink.classList.add("active");
  let farTempe = document.querySelector("#temperature");
  let farTemp = (celsTemp * 9) / 5 + 32;
  farTempe.innerHTML = Math.round(farTemp);
}

function displayCel(event) {
  event.preventDefault();
  //add link to F
  celLink.classList.add("active");
  farLink.classList.remove("active");
  let farTempe = document.querySelector("#temperature");
  farTempe.innerHTML = Math.round(celsTemp);
}
search("Uganda");
let celsTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farLink = document.querySelector("#far-link");
farLink.addEventListener("click", displayFar);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", displayCel);
