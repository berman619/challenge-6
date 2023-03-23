var searchResults = document.querySelector("#search-results");
var cityContainer = document.querySelector("#city-container");
var forecastContainer = document.querySelector("#forecast-container");
var searchButton = document.querySelector("#submit");
var apiKey = "45e4a84ada581d56153282a0a986d540";
var userInput = document.querySelector(".user-input");

function handleFormSubmit(event) {
    event.preventDefault()
    var city = userInput.value;
    if (userInput) {
        getWeather(city)
    }
}

// function that fetches weather data by user input from API 

function getWeather(city) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(queryUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            displayCurrentWeather(data);

            var getForecastURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey;
            fetch(getForecastURL)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data);
                    displayForecastWeather(data);
                })
        });
    }

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

function displayForecastWeather(forecastData) {
    var forecastContainerHtml = "";

    for (var i=0; i < 5; i++) {
    var forecastDateTime = new Date(forecastData.list[i].dt * 1000);
    var forecastDate = forecastDateTime.toLocaleDateString();
    var forecastDayOfWeek = forecastDateTime.toLocaleDateString("en-US", {weekday: "long"});
    var weatherIcon = "http://openweathermap.org/img/w/" + forecastData.list[i].weather[0].icon + ".png";
    var temperature = Math.round(forecastData.list[i].main.temp) + "°F";
    var windSpeed = Math.round(forecastData.list[i].wind.speed) + " MPH";
    var humidity = forecastData.list[i].main.humidity + "%";

    var forecastCardHtml = `
    <div class="card col-sm-12 col-md-6 col-lg-2">
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

searchButton.addEventListener("click", handleFormSubmit);
