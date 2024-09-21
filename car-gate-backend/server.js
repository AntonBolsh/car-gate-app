const express = require('express');
const mongoose = require('mongoose');
const apicontroller = require('./controllers/apicontroller');
require('dotenv').config()


const port = process.env.SERVER_PORT
//create the express app
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(apicontroller);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGODB_CONNECT, {
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(error => {
    console.log('Could not connect to the database.', error);
    process.exit();
});

//Application listens on port 7100 
app.listen(port, () => {
    console.log("server is up and running on port " + port)
})
