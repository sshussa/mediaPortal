/**
 * Module dependencies.
 */
const fs = require('fs');
const https = require('https'); 
const http = require('http'); 
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const path = require('path');
const helmet = require("helmet");

module.exports = (() => {
const app = express();

//CORS Middleware
app.use(function (req, res, next) { //allow cross origin requests
  //Enabling CORS 
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

  // all environments
  app.set('port', process.env.PORT || 5001);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(favicon('public/images/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());
  app.use(helmet()); // Add Helmet as a middleware
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'server')));
  app.use(express.static(path.join(__dirname, 'routers')));
  app.use(express.static(path.join(__dirname, 'models')));
  app.use(express.static(path.join(__dirname, 'controllers')));
  
  app.use(errorHandler());

  return app;
})();
