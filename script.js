
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

function formatDays(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = [`Sun`, `Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`];

return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index){
    if (index < 6){
    forecastHTML = forecastHTML + `
      <div class="col-2">
        <div class="forecast-day">${formatDays(forecastDay.dt)}
          <br>
         <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42">
         <div class="forecast-temp">
           <span class="forecast-max-temp"><strong>${Math.round(forecastDay.temp.max)}°</strong></span>
           <span class="forecast-min-temp">${Math.round(forecastDay.temp.min)}°</span>
         </div>
        </div>
      </div>
`; }
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
    
    getForecast(response.data.coord);
  }

let apiKey = `697c2d8339ebb153248e96d435fb4f8d`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);  
}

  let buttonPress = document.querySelector("#button-addon2");
  buttonPress.addEventListener("click", searchCity);

function showCity(position){
  let apiKey = `697c2d8339ebb153248e96d435fb4f8d`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

  axios.get(apiUrl).then(currentPosition)
}
