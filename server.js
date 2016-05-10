var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var PORT = process.env.PORT || 3000;

//DB Initialize
var db = require('./config/db');


//Logger & bodyParser middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Dir
app.use(express.static(__dirname + "/public"));
app.use('/public', express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/views"));
app.use(express.static(__dirname + "/public/views/partials"));
app.use('/bower_components', express.static(__dirname + "/bower_components"));


//Passport init & Bring in Passport Strategy
app.use(passport.initialize());
require('./config/passport')(passport);


//Routes
var authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


app.get('/', function(req, res) {
  res.send('public/views/index.html');
});


app.listen(PORT, function(req, res) {
  console.log('Listening on PORT:' + PORT);
});
