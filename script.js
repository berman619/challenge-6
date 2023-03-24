var searchResults = document.querySelector("#search-results");
var cityContainer = document.querySelector("#city-container");
var forecastContainer = document.querySelector("#forecast-container");
var searchButton = document.querySelector("#submit");
var apiKey = "45e4a84ada581d56153282a0a986d540";
var apiKey2 = "c45b9656f5f7be5716af18aff808beb6";
var userInput = document.querySelector(".user-input");

function handleFormSubmit(event) {
  event.preventDefault()
  var city = userInput.value;
  if (userInput) {
    getWeather(city)
  }
}

// function that fetches weather data and forecast data by user input from API 
function getWeather(city) {
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
  fetch(queryUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data);
      displayCurrentWeather(data);

      var getForecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=" + apiKey2;
      fetch(getForecastURL)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          console.log(data);
          displayForecastWeather(data);
        })
        var savedCities = getSavedCities();
        savedCities.push(city);
        localStorage.setItem("savedCities", JSON.stringify(savedCities));
    
        // Update list of saved cities
        displaySavedCities();
    });
}

// function that displays current weather data from API results to HTML
function displayCurrentWeather(weatherData) {
  var cityName = weatherData.name;
  var currentDate = new Date().toLocaleDateString();
  var weatherIcon = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
  var temperature = Math.round(weatherData.main.temp) + "°F";
  var windSpeed = Math.round(weatherData.wind.speed) + " MPH";
  var humidity = weatherData.main.humidity + "%";
  
  var cityContainerHtml = `
    <div class="card">
      <div class="card-body">
        <h3>${cityName} (${currentDate})<img src="${weatherIcon}"></h3>
        <p>Temperature: ${temperature}</p>
        <p>Wind: ${windSpeed}</p>
        <p>Humidity: ${humidity}</p>
      </div>
    </div>
  `;
  cityContainer.innerHTML = cityContainerHtml;
}

// function that displays forecast weather data from API results to HTML

function displayForecastWeather(forecastData) {
    var forecastContainerHtml = "";

    for (var i=0; i < 40; i+=8) {
    var forecastDateTime = new Date(forecastData.list[i].dt * 1000);
    var forecastDate = forecastDateTime.toLocaleDateString();
    var forecastDayOfWeek = forecastDateTime.toLocaleDateString("en-US", {weekday: "long"});
    var weatherIcon = "http://openweathermap.org/img/w/" + forecastData.list[i].weather[0].icon + ".png";
    var temperature = Math.round(forecastData.list[i].main.temp) + "°F";
    var windSpeed = Math.round(forecastData.list[i].wind.speed) + " MPH";
    var humidity = forecastData.list[i].main.humidity + "%";

    var forecastCardHtml = `
    <div class="card col-sm-12 col-md-5 col-lg-2 forecast-card">
      <div class="card-body">
        <h5>${forecastDayOfWeek}</h5>
        <h6>${forecastDate}</h6>
        <img src="${weatherIcon}">
        <p>Temperature: ${temperature}</p>
        <p>Wind: ${windSpeed}</p>
        <p>Humidity: ${humidity}</p>
      </div>
    </div>
  `;

  forecastContainerHtml += forecastCardHtml;
}

forecastContainer.innerHTML = forecastContainerHtml;
}

  function getSavedCities() {
    var savedCities = localStorage.getItem("savedCities");
    if (savedCities) {
      return JSON.parse(savedCities);
    } else {
      return [];
    }
  }

  function displaySavedCities() {
    var savedCities = getSavedCities();
    var savedCitiesHtml = "";
  
    for (var i = 0; i < savedCities.length; i++) {
      var city = savedCities[i];
      var cityHtml = `
        <div class="saved-city">
          <button class="btn btn-link">${city}</button>
        </div>
      `;
      savedCitiesHtml += cityHtml;
    }
  
    var searchResults = document.getElementById("search-results");
    searchResults.innerHTML = savedCitiesHtml;
  
    // Add event listeners to saved city buttons
    var savedCityButtons = document.querySelectorAll(".saved-city button");
    for (var i = 0; i < savedCityButtons.length; i++) {
      savedCityButtons[i].addEventListener("click", function() {
        var city = this.textContent;
        getWeather(city);
      });
    }
  }
  
  // Call the displaySavedCities function to update the list of saved cities
  displaySavedCities();

searchButton.addEventListener("click", handleFormSubmit);

