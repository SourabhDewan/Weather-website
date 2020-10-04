const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../../weather-app/utils/geocode')
const forecast = require('../../weather-app/utils/forecast')


const app = express()

const port = process.env.PORT || 3000 

// Define paths for express configration 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and view location 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve  
app.use(express.static(publicDirectoryPath));




app.get('', (req, res,)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Sourabh'
    })
    
})


app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Paul',
        name: 'Sourabh'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        helpText: 'This is some helpfull text.',
        title: 'Help Page',
        name: 'Sourabh'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    } else{
        const address = req.query.address
    geocode(address, (error, {Latitude, Longitude, Location}={}) => {
        if (error){
        return res.send({error})
            }
        forecast(Latitude, Longitude, (error, forecastData) => {
            if(error){
            return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: Location,
                address: req.query.address

            })    
                })
                
        })
    }    
    
})

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a address!'
        })

    }
})
app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        describe: 'Help artical not found!',
        name: 'Sourabh Dewan'
    })
})


app.get('*', (req, res) =>{
    res.render('404-page', {
        title: '404',
        describe: 'Page not found',
        name: 'Sourabh'
    })
})

app.listen(port,  ()=>{
    console.log('Server is up on port ' + port + '.')
})