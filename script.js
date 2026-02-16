const cityInput = document.getElementById("cityInput");
const weatherBtn = document.getElementById("getWeatherBtn");
const weatherResultDiv = document.getElementById("weatherResult");
const errorMessageDiv = document.getElementById("errorMessage");
const apiKey = "J8HBXC7Q36HAHKJZBXK8TJW64";

weatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) {
      getWeather(city);
    }
  }
});

async function getWeather(city) {
  try {
    weatherResultDiv.innerHTML = "";
    errorMessageDiv.classList.remove("show");

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`
    );

    if (!response.ok) {
      throw new Error("Ville non trouvée");
    }

    const weatherData = await response.json();
    displayWeather(weatherData);
  } catch (error) {
    displayError(error.message || "Erreur lors du chargement des données");
    console.error(error);
  }
}

function displayWeather(data) {
  const current = data.currentConditions;
  const temp = Math.round(current.temp);
  const humidity = current.humidity;
  const windSpeed = current.windspeed;

  weatherResultDiv.innerHTML = `
    <div class="weather-info">
      <div class="weather-city">${data.resolvedAddress}</div>
      <div class="weather-temp">${temp}°C</div>
      <div class="weather-description">${current.conditions}</div>
      <div class="weather-details">
        <div class="detail-item">
          <div class="detail-label">Humidité</div>
          <div class="detail-value">${humidity}%</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Vent</div>
          <div class="detail-value">${windSpeed.toFixed(1)} km/h</div>
        </div>
      </div>
    </div>
  `;
}

function displayError(message) {
  errorMessageDiv.textContent = message;
  errorMessageDiv.classList.add("show");
  weatherResultDiv.innerHTML = "";
}


  