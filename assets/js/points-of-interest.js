
const orsAPI = '5b3ce3597851110001cf6248e6166b0f4e4d4741a8c6950dfe78e460';


async function getPOI (lat, lon){

    let poiCollection = await searchForTouristPOI([lat,lon], orsAPI);

    let formattedCollection = [];

    for(let i = 0; i < poiCollection.features.length; i++){
        
        //Skip loop if features have no tags/name - We dont care about these because they are difficult to 
        if(!poiCollection.features[i].properties.osm_tags || poiCollection.features[i].properties.osm_tags === undefined){
            //console.log(i); 
            continue;
        }

        //Returned values will always contain: Coordinates (as an array), a geojson point (this can be ignored safely and is there just incase we need it), an array of category objects, the name of the point of interest, the distance it is from the point provided in Meters
        let poi = {
            id: poiCollection.features[i].properties.osm_id,
            coordinates: poiCollection.features[i].geometry.coordinates,
            geojson: poiCollection.features[i].geometry,
            categories: [], // for in loop over categories to update soon
            name: poiCollection.features[i].properties.osm_tags.name,
            distance: poiCollection.features[i].properties.distance, //distance from central point
        }


        //if the data returned contains a website, a phone number, wheelchair access (either no, limited or yes), opening hours, add it to the object. Not all data returned will have this.
        if(poiCollection.features[i].properties.osm_tags.website){
            poi.website = poiCollection.features[i].properties.osm_tags.website;
        }

        if(poiCollection.features[i].properties.osm_tags.phone){
            poi.phone = poiCollection.features[i].properties.osm_tags.phone;
        }

        if(poiCollection.features[i].properties.osm_tags.wheelchair){
            poi.wheelchair = poiCollection.features[i].properties.osm_tags.wheelchair;
        }

        if (poiCollection.features[i].properties.osm_tags.opening_hours){
            poi.opening_hours = poiCollection.features[i].properties.osm_tags.opening_hours;
        }

        //add the category objects information 
        for (category in poiCollection.features[i].properties.category_ids){
            poi.categories.push(poiCollection.features[i].properties.category_ids[category]);
        }


        formattedCollection.push(poi);
    }

    return formattedCollection;
}


// Test function. 
async function testFn (){
    let pois = await getPOI(151.209421, -33.868633); // melbourne
    console.log(pois);
}

testFn();