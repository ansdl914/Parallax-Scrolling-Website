let bg = document.getElementById("bg");
let moon = document.getElementById("moon");
let mountain = document.getElementById("mountain");
let road = document.getElementById("road");
let text = document.getElementById("text");

window.addEventListener('scroll', function () {
    var value = window.scrollY;

    bg.style.top = value * 0.5 + 'px';
    moon.style.left = -value * 0.5 + 'px';
    mountain.style.top = -value * 0.15 + 'px';
    road.style.top = value * 0.15 + 'px';
    bg.style.top = value * 1 + 'px';
});

// 시계 업데이트 및 인사말 변경
function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    const hours = now.getHours();
    clock.innerText = now.toLocaleTimeString();

    if (hours < 12) {
        text.innerText = "Good morning";
    } else if (hours < 18) {
        text.innerText = "Good afternoon";
    } else {
        text.innerText = "Good evening";
    }
}

setInterval(updateClock, 1000);
updateClock(); // 페이지 로드 시 즉시 시계 업데이트

// 날씨 업데이트
const API_KEY = "904a76f51c4c8be542ceba1f562348e2"; // OpenWeatherMap API 키 사용
const weatherElement = document.getElementById("weather");

function getWeather() {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
}

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const weather = `${data.weather[0].main} / ${data.main.temp}°C`;
            const city = data.name;
            weatherElement.innerText = `${city}: ${weather}`;
        });
}

function onGeoError() {
    weatherElement.innerText = "Can't find your location. No weather available.";
}

getWeather();
