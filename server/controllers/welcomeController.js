const express = require('express')
  , router = express.Router();
const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const request = require('request');
const Cookies = require('cookies');
const PrismicConfig = require('../../prismic-configuration');
const Onboarding = require('../../onboarding');
const app = require('../../config');
//const PORT = app.get('port');
const path= require('path');




  router.get('/welcome',function(req,res){
  	 req.prismic.api.getByUID('welcome', 'welcome').then((document) => {
    if (document) {
      res.json({ document });

    } else {
      res.status(404).send('404 not found');
    }
  }).catch((error) => {
    next(`error when retriving page ${error.message}`);
  	});
  });

  module.exports = router;