
let today = new Date();

function formatDate(){
let weekdays = [`Sunday`, `Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`,`Saturday`]
let day = weekdays[today.getDay()];
let hour = today.getHours();
let minute = today.getMinutes();
if (minute < 10){
  minute = `0${minute}`;
}

let todaysDate = document.querySelector("h3");
todaysDate.innerHTML = `Last updated: ${day}, ${hour}:${minute}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function(day){
    forecastHTML = forecastHTML + `
      <div class="col-2">
        <div class="forecast-day">${day}
          <br>
         <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" width="42">
         <div class="forecast-temp">
           <span class="forecast-max-temp"><strong>14°</strong></span>
           <span class="forecast-min-temp">5°</span>
         </div>
        </div>
      </div>
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast (coordinates){
  let apiKey = `697c2d8339ebb153248e96d435fb4f8d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


formatDate(new Date());

function searchCity(event){
  event.preventDefault();

  let input = document.querySelector(".form-control");
  let city = document.querySelector("#city");
  city.innerHTML = `${input.value}`;


  function displayTemp(response){
    let temperature = Math.round(response.data.main.temp);
    let description = document.querySelector("#temperature");
    let wind = document.querySelector(".wind");
    let humidity = document.querySelector(".humidity");
    let icon = document.querySelector("#icon");

    description.innerHTML = `${temperature}`;
    wind.innerHTML = Math.round(response.data.wind.speed); 
    humidity.innerHTML = Math.round(response.data.main.humidity);
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    celsiusTemperature = response.data.main.temp;
    getForecast(response.data.coord);
  }

let apiKey = `697c2d8339ebb153248e96d435fb4f8d`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);  
}

  let buttonPress = document.querySelector("#button-addon2");
  buttonPress.addEventListener("click", searchCity);


  
function currentPosition(event){
event.preventDefault();

}
let currentLocation = document.querySelector("#btn btn-outline-secondary");
currentLocation.addEventListener("click", currentPosition);

function showCity(position){
  console.log(position);
  let apiKey = `697c2d8339ebb153248e96d435fb4f8d`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

  axios.get(apiUrl).then(currentPosition)
}

navigator.geolocation.getCurrentPosition(showCity)

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Zurich");