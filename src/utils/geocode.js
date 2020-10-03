const request = require("postman-request")



const geocode = (address, callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGV3YW5zb3VyYWJoIiwiYSI6ImNrZmg2OWkwMTAyZDMzM2xjd2x1eDJkYjEifQ.GbjFjASqdklQhxCGZP18bQ&limit=1'
   
    request ({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect with the location server!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {Latitude: body.features[0].center[1],
                     Longitude: body.features[0].center[0],
                     Location: body.features[0].place_name
                    })
        }

    })

}

module.exports = geocode