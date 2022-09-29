
const orsAPI = '5b3ce3597851110001cf6248e6166b0f4e4d4741a8c6950dfe78e460';



async function getTouristPOIfsq (lat, lon){

        let apiEndpoint = `https://api.foursquare.com/v3/places/search?ll=${lat},${lon}&radius=2000&limit=50&sort=RATING&categories=10000,16000`

        let response = await fetch (apiEndpoint, {
            'headers': {
                'Accept': 'application/json',
                'Authorization': fsAPI
            }
        })

        if (response.status !== 200)
        {
            throw new Error (`Failed to invoke API`)
        }

        let data = await response.json();
        return data;
}



async function getPlaceInformation (fsqID){
    let apiEndpoint = `https://api.foursquare.com/v3/places/${fsqID}`

    let response = await fetch (apiEndpoint, {
        'headers': {
            'Accept': 'application/json',
            'Authorization': fsAPI
        }
    })

    if (response.status !== 200)
    {
        throw new Error (`Failed to invoke API`)
    }

    let data = await response.json();
    return data;
}


async function getPOIlist (lat, lon){

    let data = await getTouristPOIfsq(lat, lon);

    let formattedCollection = [];

    for(let i = 0; i < data.results.length; i++){
        
        let poi = {
            id: data.results[i].fsq_id,
            latitude: data.results[i].geocodes.main.latitude,
            longitude: data.results[i].geocodes.main.longitude,
            name: data.results[i].name,
            distance: data.results[i].distance,
            related_places: data.results[i].related_places.children,
            address: data.results[i].location.formatted_address,
            
        }


        formattedCollection.push(poi);
    }

    return formattedCollection;
}


// Test function. 
// async function testFn (){
//     let location = await geocodeLocation('Hong Kong', owAPI, 1);
//     console.log(location);

//     let pois = await getPOIlist(location[0].lat, location[0].lon); 
//     console.log(pois);
// }

// testFn();



