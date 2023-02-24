//  Nishan Gaudel 301211464 September 28 2022
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let dotenv = require('dotenv');

var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');
var contactRouter = require('./server/routes/contact');


//modules for authentication 
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

dotenv.config({ path: 'config.env' });

//MongoDB connection
const connectDB = require('./server/db/connection');

connectDB();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));





//setup express session 
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));


//initialize flash
app.use(flash());

//initalize passport module

app.use(passport.initialize());
app.use(passport.session());

let userModel = require('./server/models/user');
let User = userModel.User;

passport.use(User.createStrategy());

//serialize and Deserialize user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/business', contactRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
