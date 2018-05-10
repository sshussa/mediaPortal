/**
 * Module dependencies.
 */
const fs = require('fs');
const https = require('https'); 
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const path = require('path');


module.exports = (() => {
const app = express();
const port = 5001;
const ip   = '0.0.0.0'; 
//const privateKey = fs.readFileSync('/etc/ssl/private/digex.home.eat.brinker.org.key');
//const certificate = fs.readFileSync('/etc/ssl/certs/digex.home.eat.brinker.org.cer');
const privateKey = fs.readFileSync('C:/certs/digex.home.eat.brinker.org.key');
const certificate = fs.readFileSync('C:/certs/digex.home.eat.brinker.org.cer');
//const ca = fs.readFileSync('/opt/epaas/certs/ca');
//const pass = fs.readFileSync('/opt/epaas/certs/pass','ascii'); 

//CORS Middleware
app.use(function (req, res, next) { //allow cross origin requests
	//Enabling CORS 
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//certificate options
const options = { 
    key: privateKey,
    cert: certificate,
    //ca: ca,
    //passphrase: pass,
    requestCert: true, 
    rejectUnauthorized: false 
};
options.agent = new https.Agent(options); 

  // all environments
  app.set('port', process.env.PORT || 5001);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(favicon('public/images/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'server')));
  app.use(express.static(path.join(__dirname, 'routers')));
  app.use(express.static(path.join(__dirname, 'models')));
  app.use(express.static(path.join(__dirname, 'controllers')));
  
  app.use(errorHandler());
  
  return app;
})();
