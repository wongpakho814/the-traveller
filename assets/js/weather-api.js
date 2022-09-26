var apiKey = "2f8fa537b9d9c6dee91715b6634d3f8e"; // The personal API Key

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
    let lat = 0;
    let lon = 0;
  
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                // console.log(response);
                response.json().then(function (data) {
                    // console.log(data);
                    // Check if the API has returned any results
                    if (data.length !== 0) {
                        lat = data[0].lat;
                        lon = data[0].lon;
                        getCityWeather(lat, lon, name);
                    }
                    else {
                        alert("No results are found!");
                    }
                });
            } 
            else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        });
};

// Calling the OpenWeather 7 days daily forecast API to get the weather of the given city's latitude and longitude
function getCityWeather(lat, lon, name) {
    let apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                // console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data, name);
                });
            } 
            else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        });
}

// Initialize the page by adding the event listener to the submit buttons
function init() {
    $("#input-form").on("submit", formSubmitHandler);
}
init();