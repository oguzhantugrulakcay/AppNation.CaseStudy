const express = require('express')
const http=require("http")
const cookieParser = require('cookie-parser');
require("dotenv").config()
const home=require('./routes/homeRoutes')
const users=require('./routes/usersRoutes')
const dbContext=require("./db/connect")
const app = express()
const path = require('path')
app.use(cookieParser())
app.use(express.json())


const buildPath = path.join(__dirname, "../client/build");

app.use(express.static(buildPath));

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(buildPath, "index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});
const start = async ()=>{
    try{
        await dbContext.connect();
        console.log("DB connected");
        app.use('/home',home)
        app.use('/users',users)
        
        app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`))
    } catch(error){
        console.log(error)
    }
}
start()