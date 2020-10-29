const { response } = require('express');
const fetch = require('node-fetch')
const ratelimit = require('express-rate-limit')
const cors = require('cors')
require('dotenv').config()



const express = require('express')
const app = express()

app.set('trust proxy', 1);

app.listen(process.env.PORT||5000)


app.use(express.static('publick'))
app.use(express.json({ limit: '1mb' }))
 
//rate limits

const limit2010 = ratelimit({
  windowMs : 10*60*1000,
  max : 15
})

//apply rate limit

app.use('/weather',limit2010)
app.use('/quote',limit2010)



// API's

app.get('/test', (req, res)=> {
    res.send('its working')
  })


// const crosop = {
//     origin: *,
//     optionsSuccessStatus: 200
//   }
app.use(cors({origin: ['https://petswatercapsule.com','https://mytodos.cf','https://todo.petswatercapsule.com','http://localhost:3000']}))

app.post('/weather',(req,res)=>{
    const lon = req.body.lon
    const lat = req.body.lat
    const apikey = process.env.API_KEY
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`

    fetch(api)
          .then(responce => {return responce.json()})
          .then(data=>{
              let icon = ""
              switch(data.weather[0].main){
                  case "Clear": icon="☀" 
                  break
                  case "Thunderstorm": icon="🌩" 
                  break
                  case "Rain": icon="🌦" 
                  break
                  case "Snow": icon="❄" 
                  break
                  case "Clouds": icon="☁" 
                  break
                  case "Atmosphere": icon="🌫" 
                  break
                  case "Drizzle": icon="🌧" 
                  break
              }
              const response={
                icon,
                title:data.weather[0].main,
                temp:(data.main.temp-273.15).toFixed(2),
                city:data.name

              }
              res.json(response)
          })
    
})

//Quotes Api


app.get('/quote',(req,res)=>{
  fetch("https://zenquotes.io/api/quotes")
  .then(responce => {return responce.json()})
  .then(data=>{
    let quots =data.filter(data=>data.q.length<=50)
    const temp = quots.pop()
    res.json({q:temp.q,a:temp.a})
  })
})