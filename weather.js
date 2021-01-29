"use strict";

/*
this project uses api(i shuld sign in to OpernWeatherMap)
https://openweathermap.org/
*/
const weather = document.querySelector(".js-weather");

const API_KEY = "8dc0356c1240fa0b0dca5c4438adfe44";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      console.log(json);
      weather.innerText = `${temperature} @ ${place} `;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

/*여기서 position은 객체인데, 이 객체는 밑에 
직접 인자를 할당한 coordsObj와는 달리, 그냥
할당 없이 인자를 position에 받음
즉, getcurrentposition 매개인자쪽에 핸들지오석세스 가 있는거 같은데

 핸들지오석세스는 위도,경도를 가진 객체를 받아서 저장하는걸로 보임

handleGeoSuccess(position)

 */
function handleGeoSuccess(position) {
  console.log(position);
  const latitude = position.coords.latitude; //가로선  위도
  const longitude = position.coords.longitude; //세로선 경도
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
