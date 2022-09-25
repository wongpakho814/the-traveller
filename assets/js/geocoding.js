// For geocoding, we need to take a name or coordinates and return a collection of objects which describe the location. 

//Country is an optional parameter - OpenWeather implementation - Country code is an optional parameter which is undefined by default unless it is passed a value
async function geocodeLocation(locationName, apiKey, countryCode = undefined) {
    let apiEndpoint = '';
    
    if (countryCode !== undefined)
        apiEndpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${locationName},${countryCode}&limit=5&appid=${apiKey}`;
                       
    else
        apiEndpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=5&appid=${apiKey}`;

    const response = await fetch(apiEndpoint);

    if (response.status !== 200)
        throw new Error (`Geocoding failed. Status is: ${response.status} \nStatus Text: ${response.statusText}`);
    
    let data = await response.json();

    if (data.length === 0)
        throw new Error `Location does not exist`
    else 
        return data;
}

// Open weather Reverse Geocode
async function reverseGeocode(lat, lon, apiKey) {
    let apiEndpoint = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`

    const response = await fetch(apiEndpoint);

    if (response.status !== 200)
        throw new Error (`Geocoding failed`);
    
    let data = await response.json();

    if (data.length === 0)
        throw new Error `Location does not exist`
    else 
        return data;
}


async function orsGeocodeCity (locationName, apiKey){
    let layer = 'locality'
    let apiEndpoint = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${locationName}&layers=${layer}`;

    const response = await fetch(apiEndpoint);

    if (response.status !== 200)
        throw new Error (`Geocoding failed`);
    
    let data = await response.json();

    if (data.features.length === 0)
        throw new Error `Location does not exist`
    else 
        return data;

}




async function searchForTouristPOI (boundingBox, locationPoint, apiKey){
    
    let apiEndpoint = 'https://api.openrouteservice.org/pois';

    const response = await fetch (apiEndpoint, {
        'method': 'POST',
        'headers': {
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; chasrset=utf-8',
            'Content-Type': 'application/json',
            'Authorization': apiKey
        },
        body: JSON.stringify({
            request: 'pois',
            geometry: {
                bbox:boundingBox,
                geojson: {
                    type: 'Point',
                    coordinates: locationPoint,
                },
                buffer: 200,
            },
            //limit: 100,
        })
    })
    
    if (response.status !== 200) {
        throw new Error (`Failed to get POIs - Status code: ${response.status} \nStatus text: ${response.statusText}`)
    }
    
    const data = response.json();

    return data;
    
    
    
    /*
    example XMLHttpRequest provided by API
    let request = new XMLHttpRequest();

    request.open('POST', "https://api.openrouteservice.org/pois");

    request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', apiKey);

    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
    }
    };

    const body = '{"request":"pois","geometry":{"bbox":[[8.8034,53.0756],[8.7834,53.0456]],"geojson":{"type":"Point","coordinates":[8.8034,53.0756]},"buffer":200}}';

    request.send(body);
    */
}


