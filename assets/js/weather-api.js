var apiKey = "2f8fa537b9d9c6dee91715b6634d3f8e"; // The personal API Key
var lat = 0;
var lon = 0;

// Handles the submit button, which fetches the city name that the user input and get the coordinates of the city
function formSubmitHandler(event) {
    event.preventDefault();

    let city = $("#city-name").val();
  
    if (city) {
        getCityCoords(city);
    } 
    else {
        alert('Please enter a city username');
    }
};

// Calling the OpenWeather Direct geocoding API to get the latitude and longitude of the given city name
function getCityCoords(name) {
    let apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + name + "&appid=" + apiKey;
  
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                // console.log(response);
                response.json().then(async function (data) {
                    console.log(data);
                    // Check if the API has returned any results
                    if (data.length !== 0) {
                        $(".forecast-div").addClass("columns");
                        $("#weather-hint").hide();
                        lat = data[0].lat;
                        lon = data[0].lon;

                        //Saves city name and city coordinates to local storage
                      
                        var cityList = [];
                        
                        var citySearch = {
                            cityName: name,
                            cityLat: lat,
                            cityLon: lon,
                            poi:{}};
                        
                            var storedCityList = JSON.parse(localStorage.getItem("savedCities"));
                            if(storedCityList !== null){
                            cityList = storedCityList;}
                            cityList.push(citySearch);
                        
                        localStorage.setItem("savedCities",JSON.stringify(cityList));
                        
                            
                    

                        getCityWeather(lat, lon, name);
                    }
                    else {
                        $("#weather-hint").textContent = "No results are found for " + '"' + name + '"' + "!";
                    }
                });
            } 
            else {
                $("#weather-hint").textContent = "Error: " + response.statusText;
            }
        })
        .catch(function (error) {
            $("#weather-hint").textContent = "Unable to connect to OpenWeather";
        });
};

// Calling the OpenWeather 7 days daily forecast API to get the weather of the given city's latitude and longitude
function getCityWeather(name) {
    let apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                // console.log(response);
                response.json().then(function (data) {
                    // console.log(data);
                    displayWeather(data, name);
                });
            } 
            else {
                $("#weather-hint").textContent = "Error: " + response.statusText;
            }
        })
        .catch(function (error) {
            $("#weather-hint").textContent = "Unable to connect to OpenWeather";
        });
}

// Displays the weather data fetched from the API
function displayWeather(weather, city) {
    // Clear the innerHTML of the previous results, if there are
    document.querySelector(".forecast-div").innerHTML = "";

    // Capitalize the first letter of each word in the city's name
    city = capitalizeWords(city);

    // Rendering the weather for today and the next 6 days
    for (let i = 0; i < weather.daily.length - 1; i++) {
        renderTodayWeather(i, weather, city);
    }
}

// Creates and renders the HTML for the next 7 days' weather
function renderTodayWeather(i, weather, city) {
    let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    let DT = new Date(weather.daily[i].dt * 1000); 

    let temp = weather.daily[i].temp.day;
    let precipitation = weather.daily[i].pop;
    let humid = weather.daily[i].humidity;

    let weatherEl = document.createElement("div");
    weatherEl.setAttribute("class", "column mr-3 weather-div");
    let titleEl = document.createElement("h2"); // e.g. Atlanta (DD/MM/YYYY)
    titleEl.textContent = city + " (" + DT.getDate() + "/" + months[DT.getMonth()] + "/" + DT.getFullYear() + ") ";
    let iconEl = document.createElement("img"); // e.g. 🔆
    iconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + weather.daily[i].weather[0].icon + "@2x.png");
    let tempEl = document.createElement("p");
    tempEl.textContent = "Temperature: " + temp + "°C";
    let popEl = document.createElement("p");
    popEl.textContent = "Precipitation: " + precipitation + "%";
    let humidEl = document.createElement("p");
    humidEl.textContent = "Humidity: " + humid + "%";

    let forecastEl = document.querySelector(".forecast-div");
    forecastEl.appendChild(weatherEl);
    weatherEl.appendChild(titleEl);
    weatherEl.appendChild(iconEl);
    weatherEl.appendChild(tempEl);
    weatherEl.appendChild(popEl);
    weatherEl.appendChild(humidEl);
}

// Capitalize the first letter of each word
function capitalizeWords(sentence) {
    sentence = sentence.toLowerCase();
    const words = sentence.split(" ");

    return words.map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(" ");
}

// Initialize the page by adding the event listener to the submit buttons
function init() {
    $("#input-form").on("submit", formSubmitHandler);

}
init();