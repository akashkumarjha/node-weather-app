const path = require('path');
const express = require('express');
const hbs = require('hbs')
const request = require('request')
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000

//Define Path for express server
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup Handlebars engine and view location
app.set('view engine','hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index',{title:'Home',name:'Akash Jha'});
});
 
app.get('/weather',(req, res)=>{
 // console.log(req.query)
  if(!req.query.address){
   return res.send('Please provide search term')
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }
      //console.log("Weather Information of " + location + " is " + forecastData);
      res.send({
        forecast:forecastData,
        location,
        Address:req.query.address

        

      })
    });
  });
})

 
app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About',
    name:'Akash Jha'
  })
})

app.get('/help',(req,res) => {
  res.render('help',{
    title:'Help',
    name:'Akash Jha'
  })
})

app.get('/help/*', (req, res) =>{
res.render('dataNotFound',{
  title:'404',
  name:'Akash Jha',
  errorMessage:'Help Artices Not Fonud'
})
})
   

app.get('*',(req,res) =>{
  res.render('page404',{
    title:'404',
    name:'Akash Jha',
    errorMessage:'404 Error, Page Not Found'
  })

})



app.listen(port, () => {
  console.log('Server is up on '+port);
});
