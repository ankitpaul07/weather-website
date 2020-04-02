const path=require('path');
const express = require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode.js');
const forecast=require('./utils/forecast.js');

const app=express(); // creates new express application
const port=process.env.PORT || 3000;

app.set('view engine','hbs');    //helps to set the value
app.set('views',path.join(__dirname,'../templates/views'));

app.use(express.static(path.join(__dirname,'../public')));

const partialPath=path.join(__dirname,'../templates/partials');

hbs.registerPartials(partialPath);

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Ankit Paul',
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ankit Paul',
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'Help Help!!!',
        title:'Help',
        name:'Ankit Paul',
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address',
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({
                    error,
                })
            }
            res.send({
                 forecast:forecastData,
                 location,
                 address:req.query.address,
            }
            )
        })
        
    });

});

 app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term',
        })
    }

     console.log(req.query);
     res.send({
         products:[],
     })
 })

app.get('/help/*',(req,res)=>{
    res.render('404error',{
        error:'Help article not found',
        name:'Ankit Paul',
    });
})

app.get('*',(req,res)=>{
    res.render('404error',{
        error:'Page not found',
        name:'Ankit Paul',
    });
})

//app.com
//app.com/help
//app.com/about

app.listen(port,()=>{
    console.log('Server is up on port'+port);
});