var searchResults = document.querySelector("#search-results");
var cityContainer = document.querySelector("#city-container");
var forecastContainer = document.querySelector("#forecast-container");
var searchButton = document.querySelector("#submit");
var apiKey = "45e4a84ada581d56153282a0a986d540";

function handleFormSubmit(event) {
    event.preventDefault()
    var city = userInput.value
    if (userInput) {
        getWeatherInfo(cities)
    }
}

// function that fetches weather data by user input from API 

function getCities(cities) {
    var queryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&limit=5&appid=" + apiKey
    fetch(queryUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);

            let searchResults = "";
            for (let i = 0; i < 10 && i < data.results.length; i++) {
                const result = data.results[i];
                searchResults += `<button class="search-button" data-id="${result.id}">${result.title}</button>`;
            }
            document.getElementById("search-results").innerHTML = `${searchResults}`;

            var searchButtons = document.querySelectorAll(".search-button");
            for (let i = 0; i < searchButtons.length; i++) {
                searchButtons[i].addEventListener("click", getWeatherInfo);
            }
        })

}

function getWeatherInfo(weather) {
    var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey
    fetch(queryUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
    })
}