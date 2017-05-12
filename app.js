const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');
const activities = require('./routes/activities');

//connect to database
mongoose.connect(config.database);
//on connection
mongoose.connection.on('connected',() => {
  console.log('connected to database '+ config.database);
});

//on error
mongoose.connection.on('error',(err) => {
  console.log('Database error: '+ err+ config.database);
});

//express 
const app = express();

//port number
const port = process.env.PORT || 8080;//3000;

//use cors to enable every domain  to access
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'bower_components')));


// Body parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);
app.use('/activities',activities);

//Index Route
app.get('/',(req, res) => {
  res.send("Invalid endpoints");
});

app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start Server
app.listen(port, () =>{
  console.log('Server started on port '+port);
});
