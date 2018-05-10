const fs = require('fs');
const https = require('https'); 
const http = require('http'); 
const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const request = require('request');
const Cookies = require('cookies');
const PrismicConfig = require('./prismic-configuration');
const Onboarding = require('./onboarding');
const app = require('./config');
const express=require('express');
const sql = require("mssql");
const PORT = app.get('port');
const path= require('path');
const fetch = require('node-fetch');
const helmet = require("helmet");

//Setting up server
app.listen(PORT, () => {
  Onboarding.trigger();
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});

const port = 5001;
const ip   = '0.0.0.0'; 
//const privateKey = fs.readFileSync('/etc/ssl/private/digex.home.eat.brinker.org.key');
//const certificate = fs.readFileSync('/etc/ssl/certs/digex.home.eat.brinker.org.cer');

const privateKey = fs.readFileSync('C:/certs/digex.home.eat.brinker.org.key');
const certificate = fs.readFileSync('C:/certs/digex.home.eat.brinker.org.cer');
//const ca = fs.readFileSync('/opt/epaas/certs/ca');
//const pass = fs.readFileSync('/opt/epaas/certs/pass','ascii'); 
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


// Middleware to inject prismic context
app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: PrismicConfig.apiEndpoint,
    linkResolver: PrismicConfig.linkResolver,
  };
  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
  Prismic.api(PrismicConfig.apiEndpoint, {
    accessToken: PrismicConfig.accessToken,
    req,
  }).then((api) => {
    req.prismic = { api };
    next();
  }).catch((error) => {
    next(error.message);
  });
});


app.use(require('./server/controllers'));
const prnewswireApi=require('./server/restApi/callprnewswireApi.js')(app);

/*function handleJson(data) {
  const releaseObj=data['release'];
    //console.log(data);
    console.log(releaseObj);
    }

fetch('http://demo.investorroom.com/api/newsfeed_releases/list.php?format=json').then(response => {
  return response.json();
}).then(handleJson)
.catch(console.log);*/

app.use(function(req, res, next) {
  console.log('** HTTP Error - 404 for request: ' + req.url);
  res.redirect(404, req.url);
});

/*https.createServer(options, app).listen(PORT, function () {
  Onboarding.trigger();
  process.stdout.write(`Point your browser to: https://localhost:${PORT}\n`);
        });*/