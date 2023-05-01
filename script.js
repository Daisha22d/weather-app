var API_Key = '9bb889f0f69f1ae3acc3f3caa9f9515a';
var city;
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="; 
var date = dayjs();


var searchBar = document.getElementById('search-bar');
var searchBtn = document.getElementById('search-btn');
var searchHistory = document.getElementById('search-history');
var currentWeather = document.getElementById('current-weather');
var futureForecast = document.getElementById('future-forecast');

var cityel = document.querySelector('.city');
var wind= document.querySelector('.wind');
var temp= document.querySelector('.temp');
var humidity= document.querySelector('.humidity');

var fiveDay = document.querySelector('.fiveDay');

//User can search when the search button is clicked
function userSearch() {
    city = searchBar.value;

    if (city) {
        //Fetch weather data for searched city
        fetchCityWeather(city)
        .then(function(data) {
            addToSearchHistory(city);
            saveToLocalStorage(city);
            displayCurrentWeather(data);
            displayForecast(data);
            searchBar.value = '';
            searchBar.focus();
        });
    }
}

searchBtn.addEventListener('click', userSearch);

//Fetch data for given city
function fetchCityWeather(city) {
    var API_Key = '9bb889f0f69f1ae3acc3f3caa9f9515a';
    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + API_Key + '&units=imperial';

    return fetch(queryURL)
    .then(function(response) {
        if (!response.ok) {
            throw new Error('City not found');
        }
        return response.json();
    });
}

//Search History
function addToSearchHistory(city) {
    var newCity = document.createElement('new-city');
    newCity.textContent = city;
    newCity.addEventListener('click', function() {
        userSearchByHistory(city);
    });
    searchHistory.appendChild(newCity);
}
//Save to local storage 
function saveToLocalStorage(city) {
    var searchHistoryItems = localStorage.getItem('searchHistory');

    if (searchHistoryItems) {
        searchHistoryItems = JSON.parse(searchHistoryItems);
    } else {
        searchHistoryItems = [];
    }
    searchHistoryItems.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryItems));
}
//Load search history from local storage 
function loadSearchHistory() {
    var searchHistoryItems = JSON.parse(localStorage.getItem('searchHistory'));

    if (searchHistoryItems) {
        for (var i = 0; i < searchHistoryItems.length; i++) {
            addToSearchHistory(searchHistoryItems[i]);
        }
    }
}
//Perform a search by clicking on a city in the search history
function performSearchByHistory(city) {
    searchBar.value = city;
    userSearch();
}
//Show current weather info
function displayCurrentWeather(data) {
    cityel.textContent = data.city.name;
    temp.textContent = `temp: ${data.list[0].main.temp} °F `;
    wind.textContent = `wind speed: ${data.list[0].wind.speed} mph`;
    humidity.textContent = `humidity: ${data.list[0].main.humidity} %`;
    
}
// Displays the forecast for the next 5 days
function displayForecast(data) {
    console.log(data);
    for (var i = 0; i < data.list.length; i = i + 8) {
        console.log(data.list[i]);
        var html = `<div class="day-card">
        <div class="day-card-day">${data.list[i].dt_txt.split(' ')[0]}</div>
        <span class="temp-info">Temp: ${data.list[i].main.temp}°F </span>
        <span class="temp-info">Wind: ${data.list[i].wind.speed} mph </span>
        <span class="temp-info">Humidity: ${data.list[i].main.humidity} % </span>
      </div>`
        fiveDay.insertAdjacentHTML('beforeend', html);
    }
  }
  
  
// Helper function to get the current date
// function getCurrentDate();