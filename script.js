var searchEl = document.querySelector('#search')
var submitButton = document.querySelector('#submit')
var containerEl = document.querySelector('#cityData')
var cityName = document.querySelector('#cityName')
var cityInfo = document.querySelector('#cityInfo')
var weatherIcon = document.querySelector('#logoHeader')
var mainContainer = document.querySelector('.main-container')
var daytitle = document.querySelector('.fiveday')
var fivedaycontainer = document.querySelector('.fivedaycontainer')
var formEl = document.querySelector('.form')

// var savedSearch = localStorage.getItem('searched');
// var savedList = document.querySelector('.savedList');
// savedList.innerHTML = renderSavedSearch()

var apiKey = '0a45a68090d0c1d4c19b1d2ba3a9e579'
var limit = 1
var exclude = "minutely,hourly,alerts"
var latitude = ''
var longitude = ''

var submitSearch = (event) => {
    event.preventDefault()

    var searched = searchEl.value;
    var saveArray = {searched};
    localStorage.setItem('storedSearch', JSON.stringify(saveArray));

    
    if(searchEl.value){
        mainContainer.style.display = "block";
        daytitle.style.display = "flex";
        fivedaycontainer.style.display = "flex";
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchEl.value}&limit=1&appid=0a45a68090d0c1d4c19b1d2ba3a9e579`)
        .then(response => {return response.json()})
        .then(result => {this.renderGeoResults(result);})
    }
    
    // .then(result => {console.log(result); console.log(result[0].lat)})
}

submitButton.addEventListener('click', submitSearch);


// function renderSavedSearch(){
    
//     var localSearch = JSON.parse(localStorage.setItem('storedSearch'));
//     var oldSearch = localSearch.searched
//     var addNewSearch = document.createElement("button");
//     addNewSearch.class = "savedSearchBtn";
//     addNewSearch.textContent = oldSearch;
//     searchEl.value = oldSearch;
//     formEl.appendChild(addNewSearch);

//     searchEl.value = ''

//     console.log(localSearch.searched);    
// }

function renderGeoResults(result) {

    var cityHeader = result[0].name
    var stateHeader = result[0].state
    cityName.innerHTML = cityHeader + ", " + stateHeader
    
    latitude = result[0].lat
    longitude = result[0].lon
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
    .then(response => {return response.json()})
    .then(result => {this.renderCityData(result);})
}

var cityTemp = document.querySelector('#cityTemp')
var cityWind = document.querySelector('#cityWind')
var cityHumidity = document.querySelector('#cityHumidity')
var cityUV = document.querySelector('#cityUV')

function renderCityData(result) { //main weather
    // City Icon addition 
    var weatherId = result.weather[0].icon
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherId}.png`
    
// temperature list item
    cityTemp.textContent = "Temp: " + result.main.temp + "°F"
// Wind Speed List Item
    cityWind.textContent = "Wind: " + result.wind.speed + " mph"
// Humidity List Item
    cityHumidity.textContent = "Humidity: " + result.main.humidity + "%"

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&appid=${apiKey}&units=imperial`)
    .then(response => {return response.json()})
    .then(result => {this.renderFivedayData(result)})
}

var Day1 = document.querySelector("#dayone")
var Day2 = document.querySelector("#daytwo")
var Day3 = document.querySelector("#daythree")
var Day4 = document.querySelector("#dayfour")
var Day5 = document.querySelector("#dayfive")

var weekforecast = document.querySelector('.weekforecast')

function renderFivedayData(result) {

    // console.log(result)

    for (let i = 1; i < 6; i++) {
        var {temp, wind_speed, humidity, feels_like} = result.daily[i];
        var fivedayIcon = result.daily[i].weather[0].icon;
        var dateHeader = moment.unix(result.daily[i].dt).format("l");
        var dayOfWeek = moment.unix(result.daily[i].dt).format("dddd");
        if(i==1){
            Day1.innerHTML = `<h2>${dateHeader}</h2>
            <img id="logoHeader" src= "https://openweathermap.org/img/wn/${fivedayIcon}.png">
            <ul id="cityInfo">
                <li class="cityList" id="dayOfWeek">${dayOfWeek}</li>
                <li class="cityList">Tempurature: ${temp.day}°F</li>
                <li class="cityList">Wind Speed: ${wind_speed} mph</li>
                <li class="cityList">Humidity: ${humidity}%</li>
                <li class="cityList">Feels Like: ${feels_like.day}°F</li>
            </ul>`;
        } else if(i==2) {
            Day2.innerHTML = `<h2>${dateHeader}</h2>
            <img id="logoHeader" src= "https://openweathermap.org/img/wn/${fivedayIcon}.png">
            <ul id="cityInfo">
                <li class="cityList" id="dayOfWeek">${dayOfWeek}</li>
                <li class="cityList">Tempurature: ${temp.day}°F</li>
                <li class="cityList">Wind Speed: ${wind_speed} mph</li>
                <li class="cityList">Humidity: ${humidity}%</li>
                <li class="cityList">Feels Like: ${feels_like.day}°F</li>
            </ul>`
        } else if(i==3) {
            Day3.innerHTML = `<h2>${dateHeader}</h2>
            <img id="logoHeader" src= "https://openweathermap.org/img/wn/${fivedayIcon}.png">
            <ul id="cityInfo">
                <li class="cityList" id="dayOfWeek">${dayOfWeek}</li>
                <li class="cityList">Tempurature: ${temp.day}°F</li>
                <li class="cityList">Wind Speed: ${wind_speed} mph</li>
                <li class="cityList">Humidity: ${humidity}%</li>
                <li class="cityList">Feels Like: ${feels_like.day}°F</li>
            </ul>`
        } else if(i==4) {
            Day4.innerHTML = `<h2>${dateHeader}</h2>
            <img id="logoHeader" src= "https://openweathermap.org/img/wn/${fivedayIcon}.png">
            <ul id="cityInfo">
            <li class="cityList" id="dayOfWeek">${dayOfWeek}</li>
                <li class="cityList">Tempurature: ${temp.day}°F</li>
                <li class="cityList">Wind Speed: ${wind_speed} mph</li>
                <li class="cityList">Humidity: ${humidity}%</li>
                <li class="cityList">Feels Like: ${feels_like.day}°F</li>
            </ul>`
        } else if(i==5) {
            Day5.innerHTML = `<h2>${dateHeader}</h2>
            <img id="logoHeader" src= "https://openweathermap.org/img/wn/${fivedayIcon}.png">
            <ul id="cityInfo">
                <li class="cityList" id="dayOfWeek">${dayOfWeek}</li>
                <li class="cityList">Tempurature: ${temp.day}°F</li>
                <li class="cityList">Wind Speed: ${wind_speed} mph</li>
                <li class="cityList">Humidity: ${humidity}%</li>
                <li class="cityList">Feels Like: ${feels_like.day}°F</li>
            </ul>`
        }
        
    }

}

