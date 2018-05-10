const express = require('express')
  , router = express.Router();

  router.get('/brinkerexecutives',function(req,res){

  	req.prismic.api.getByUID('brinker_leadership_bios', 'leadership-brinkerexecutives').then((document) => {
 
    if (document) {

      res.json({ document });

    } else {
      res.status(404).send('404 not found');
    }
  }).catch((error) => {
    next(`error when retriving page ${error.message}`);
  	});
});

  router.get('/',function(req,res){});

  router.get('/',function(req,res){});

  module.exports = router;