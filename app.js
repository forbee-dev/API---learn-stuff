const express = require ("express");
const https = require ("https");

const app = express ();

app.get("/", function(req, res) {
    //res.send("Serve up ")



const url = "https://api.openweathermap.org/data/2.5/weather?q=Porto&units=metric&appid=c73d9cdb31fd6a386bee66158b116cd0";
https.get (url, function(response) {
    //console.log(response);

    response.on("data", function(data){
        const wData = JSON.parse(data)
        const temp = wData.main.temp
        const desc = wData.weather[0].description
        const icon = wData.weather[0].icon
        const imgURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png"
 
        res.write ("<p>The weather is " + desc + "</p>");
        res.write ("<p>The temperature in Porto is " + temp + "</p>");
        res.write ("<img src=" + imgURL + ">");

        res.send();

        console.log(desc);

}
    
    
    )
    
})
})

app.listen(3000, function() {
    console.log("server on port 3000");


}
)