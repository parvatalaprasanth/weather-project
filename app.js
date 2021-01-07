const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
const sql=require("mssql");
var config=require("./dbconfig")
const app=express();


app.listen(process.env.PORT || 3000,function(){
  console.log("server is running");
})





app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  req.body.cityname;
  const query=req.body.cityname;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=64c9c943d966097367bee336201a6dbe&units=metric";
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data",async function(data){
      const weatherdata=JSON.parse(data);
      const temp=weatherdata.main.temp;
      console.log(temp);
      const dis=weatherdata.weather[0].description;
      console.log(dis);
      const img="http://openweathermap.org/img/wn/"+weatherdata.weather[0].icon+"@2x.png";
      console.log(img);
      res.write("<p>the wheather is "+dis+"</p>");
      res.write("<img src="+img+">");

      res.write("<h1>temparature in "+query+" "+temp+"</h1>");
      res.send();










    })
  })
})
