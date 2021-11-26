const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fruitModule = require(__dirname +"/fruit.js");

const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static("public"));


// Module de fruit

app.get("/module", function(req,res){
    const fruit =fruitModule.getFruit();
    const tabFruit =fruitModule.getFruitArray();
    res.render('fruit',{tabfrt : tabFruit});
});


// Mon application météo

app.get("/", function(req,res){
    res.render('index');
});

app.post("/", function(req,res){
    res.render('index');
});

 app.post("/infos",function(req,res){
    const tableau_weather =[];
    const ville = req.body.ville;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ville+"&appid=06b8b53371b8eaf8da0be1f5e0664fae&units=metric";
    https.get(url,function(response){

        response.on("data",function(data){
            const meteo_data = JSON.parse(data);
            const meteo = {
                city : ville,
                temperature : meteo_data.main.temp,
                description : meteo_data.weather[0].description,
                icon : meteo_data.weather[0].icon
            }          
            tableau_weather.push(meteo);
            res.render('weather',{tableau:tableau_weather});

        });
    });
});

app.listen(3000, function(){
    console.log("Server OK");
});