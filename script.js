
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

formatDate(new Date());

function searchCity(event){
  event.preventDefault();

  let input = document.querySelector(".form-control");
  let city = document.querySelector("#city");
  city.innerHTML = `${input.value}`;


  function displayTemp(response){
    let temperature = Math.round(response.data.main.temp);
    let description = document.querySelector(".temp-today");
    let wind = document.querySelector(".wind");
    let humidity = document.querySelector(".humidity");
    let icon = document.querySelector("#icon");

    description.innerHTML = `${temperature}`;
    wind.innerHTML = Math.round(response.data.wind.speed); 
    humidity.innerHTML = Math.round(response.data.main.humidity);
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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
