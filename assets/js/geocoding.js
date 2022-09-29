// For geocoding, we need to take a name or coordinates and return a collection of objects which describe the location. 

//Country is an optional parameter - OpenWeather implementation - Country code is an optional parameter which is undefined by default unless it is passed a value
async function geocodeLocation(locationName, apiKey, limit = 5, countryCode = undefined) {
    let apiEndpoint = '';

    if (countryCode !== undefined)
        apiEndpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${locationName},${countryCode}&limit=5&appid=${apiKey}`;

    else
        apiEndpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=${limit}&appid=${apiKey}`;

    const response = await fetch(apiEndpoint);

    if (response.status !== 200)
        throw new Error(`Geocoding failed. Status is: ${response.status} \nStatus Text: ${response.statusText}`);

    let data = await response.json();

    if (data.length === 0)
        throw new Error(`Location does not exist`);
    else
        return data;
}

// Open weather Reverse Geocode
async function reverseGeocode(lat, lon, apiKey) {
    let apiEndpoint = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`

    const response = await fetch(apiEndpoint);

    if (response.status !== 200)
        throw new Error(`Geocoding failed`);

    let data = await response.json();

    if (data.length === 0)
        throw new Error(`Location does not exist`);
    else
        return data;
}

