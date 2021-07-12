const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
var bodyParser = require('body-parser')
app.use(cors());




app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
 });


mongoose.connect('mongodb+srv://fds:fds@cluster0.f7rfq.mongodb.net/fds?authSource=admin&replicaSet=atlas-4yh4n6-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log('cnx failed');
});



const authRoute = require('./Routes/auth');    
app.use('/api/user',authRoute);

app.listen(3000 , () => console.log("server running perfectly in local"));