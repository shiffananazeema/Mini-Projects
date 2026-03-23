const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const weatherContainer = document.querySelector("#weatherContainer");
const message = document.querySelector("#message");

const API_KEY = "YOUR_API_KEY";

let weatherData = null;

async function fetchWeather(url) {
  message.textContent = "Loading weather...";
  weatherContainer.innerHTML = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (Number(data.cod) !== 200) {
      weatherData = null;
      message.textContent = "City not found.";
      return;
    }

    weatherData = data;
    render();
  } catch (error) {
    weatherData = null;
    message.textContent = "Failed to load weather.";
    console.error(error);
  }
}

function render() {
  weatherContainer.innerHTML = "";

  if (!weatherData) return;

  message.textContent = "";

  const card = document.createElement("div");
  card.className = "weather-card";

  const icon = weatherData.weather[0].icon;

  card.innerHTML = `
    <div class="weather-top">
      <div class="location">
        <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
        <p class="condition">${weatherData.weather[0].description}</p>
      </div>

      <div class="weather-main">
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weatherData.weather[0].description}">
        <div class="temp">${Math.round(weatherData.main.temp)}°C</div>
      </div>
    </div>

    <div class="weather-grid">
      <div class="info-box">
        <span>Feels Like</span>
        <strong>${Math.round(weatherData.main.feels_like)}°C</strong>
      </div>

      <div class="info-box">
        <span>Humidity</span>
        <strong>${weatherData.main.humidity}%</strong>
      </div>

      <div class="info-box">
        <span>Wind</span>
        <strong>${weatherData.wind.speed} m/s</strong>
      </div>

      <div class="info-box">
        <span>Pressure</span>
        <strong>${weatherData.main.pressure} hPa</strong>
      </div>
    </div>
  `;

  weatherContainer.appendChild(card);
}

function searchWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    message.textContent = "Please enter a city.";
    weatherContainer.innerHTML = "";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  fetchWeather(url);
}

searchBtn.addEventListener("click", searchWeather);

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchWeather();
  }
});
