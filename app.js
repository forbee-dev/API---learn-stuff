const { query } = require("express");
const express = require ("express");
const https = require ("https");
const bodyParser = require ("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    //res.send("Serve up ")
    res.sendFile(__dirname + "/index.html");
});

    app.post("/", function(req, res) {
        //console.log(req.body.cityName);
        const query = req.body.cityName;
        const apiKey = "c73d9cdb31fd6a386bee66158b116cd0";
        const units = "metric";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;
        
        https.get (url, function(response) {
            //console.log(response);
        
            response.on("data", function(data){
                const wData = JSON.parse(data)
                const temp = Math.round(wData.main.temp)
                const desc = wData.weather[0].description
                const icon = wData.weather[0].icon
                const imgURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png"
         
                res.write ("<p>The weather is " + desc + "</p>");
                res.write ("<p>The temperature in " + query + " is " + temp + "</p>");
                res.write ("<img src=" + imgURL + ">");
        
                res.send();
        
                console.log(desc);
        
            })
            
        })

    })

app.listen(3000, function() {
    console.log("server on port 3000");


})