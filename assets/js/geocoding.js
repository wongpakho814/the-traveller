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
        throw new Error(`Geocoding failed. Status is: ${response.status} \nStatus Text: ${response.statusText}`);

    let data = await response.json();

    if (data.length === 0)
        throw new Error`Location does not exist`
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
        throw new Error`Location does not exist`
    else
        return data;
}


async function orsGeocodeCity(locationName, apiKey) {
    let layer = 'locality'; // Search only for cities or larger localities
    let apiEndpoint = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${locationName}&layers=${layer}`;

    const response = await fetch(apiEndpoint);

    if (response.status !== 200)
        throw new Error(`Geocoding failed`);

    let data = await response.json();

    if (data.features.length === 0)
        throw new Error`Location does not exist`
    else
        return data;

}



//Provide a single point in an array of [latitude, longitude] as location point and 
async function searchForTouristPOI(locationPoint, apiKey) {

    let boundingBox = calculateBoundingBox(locationPoint);

    let apiEndpoint = 'https://api.openrouteservice.org/pois';

    let categoryIDs = [308, 309, 310];
    let categoryGroupIDs = [130, 220, 620];

    const response = await fetch(apiEndpoint, {
        'method': 'POST',
        'headers': {
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; chasrset=utf-8',
            'Content-Type': 'application/json',
            'Authorization': apiKey
        },
        body: JSON.stringify({
            request: 'pois',
            geometry: {
                bbox: boundingBox,
                geojson: {
                    type: 'Point',
                    coordinates: locationPoint,
                },
                buffer: 2000,
            },
            limit: 500,
            filters: {
                category_ids: categoryIDs,
                category_group_ids: categoryGroupIDs,
            }
        })
    })

    if (response.status !== 200) {
        throw new Error(`Failed to get POIs - Status code: ${response.status} \nStatus text: ${response.statusText}`)
    }

    const data = await response.json();

    return data;

}

//Accpets an array of [lon, lat] and uses this to construct a valid bounding box for geolocation, poi and route services calculations
// creates a bounding box approximately 5.5km by 5.5km by adding 0.025 degrees around the central point provided for a total of 0.05 degrees or approximately 5.5km (1 degrees of lat or lon is approxaimately 111km - https://www.johndcook.com/how_big_is_a_degree.html)
//return format is in [[min longitude, min latitude], [max longitude, max latitude]]
function calculateBoundingBox (geoPoint) {
    let minlon = parseFloat((geoPoint[0] - 0.025).toFixed(6));
    let minlat = parseFloat((geoPoint[1] - 0.025).toFixed(6));

    let maxlon = parseFloat((geoPoint[0] + 0.025).toFixed(6));
    let maxlat = parseFloat((geoPoint[1] + 0.025).toFixed(6));
    
    return [[minlon, minlat], [maxlon, maxlat]];
}

