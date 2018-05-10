const express = require('express')
  , router = express.Router();

  router.get('/brinker-fact-sheet',function(req,res){
  	req.prismic.api.getByUID('brinker_fact_sheet', 'brinkerfactsheet').then((document) => {

    if (document) {
      res.json({ document });

    } else {
      res.status(404).send('404 not found');
    }
  }).catch((error) => {
    next(`error when retriving page ${error.message}`);
  });
  });

router.get('/chili-fact-sheet',function(req,res){ 
  req.prismic.api.getByUID('chili_fact_sheet', 'chilisfactsheet').then((document) => {
    if (document) {
      res.json({ document });

    } else {
      res.status(404).send('404 not found');
    }
  }).catch((error) => {
    next(`error when retriving page ${error.message}`);
  });
});

router.get('/chili-fun-facts',function(req,res){
  req.prismic.api.getByUID('chili_fun_facts', 'chilisfunfacts').then((document) => {

    if (document) {
      res.json({ document });

    } else {
      res.status(404).send('404 not found');
    }
  }).catch((error) => {
    next(`error when retriving page ${error.message}`);
  });
});

router.get('/global-fact-sheet',function(req,res){
  req.prismic.api.getByUID('global_business_development_fs', 'globalfactsheet').then((document) => {
 
    if (document) {

      res.json({ document });

    } else {
      res.status(404).send('404 not found');
    }
  }).catch((error) => {
    next(`error when retriving page ${error.message}`);
  });
});

router.get('/maggiano-fact-sheet',function(req,res){
req.prismic.api.getByUID('maggiano_fact_sheet', 'maggianosfactsheet').then((document) => {
 
    if (document) {

      res.json({ document });

    } else {
      res.status(404).send('404 not found');
    }
  }).catch((error) => {
    next(`error when retriving page ${error.message}`);
  });
});

router.get('/maggiano-fun-fact',function(req,res){
  req.prismic.api.getByUID('maggiano_fun_facts', 'maggianosfunfacts').then((document) => {
 
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