const baseModule = require('hbs')
const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ae7620d9a05d4df3a5dae91ff6113c7a&query='+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    request ({url, json: true}, (error,{body})=>{
        if (error){
            callback('Unable to connect with the Weather service!', undefined)
        }else if (body.error){
            callback('Unable to find the location!', undefined)
        }else{
            callback(undefined,(body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. it feels like " + body.current.feelslike + " degress out. The humidity is " + body.current.humidity + '.')
        )}


    })
}

module.exports = forecast