const express = require('express')
  , router = express.Router();

 router.get('/image-gallery',function(req,res){

	req.prismic.api.getByUID('image_gallery', 'imagegallery-chili').then((document) => {
	 
	    if (document) {

	      res.json({ document });

	    } else {
	      res.status(404).send('404 not found');
	    }
	  }).catch((error) => {
	    next(`error when retriving page ${error.message}`);
	  });
  });

  router.get('/image-gallery-brinker-leadership',function(req,res){
  	req.prismic.api.getByUID('image_gallery', 'imagegallery-brinker-leadership').then((document) => {
 
    if (document) {

      res.json({ document });

    } else {
      res.status(404).send('404 not found');
    }
  }).catch((error) => {
    next(`error when retriving page ${error.message}`);
  	});
  });

  router.get('/image-gallery-maggianos-leadership',function(req,res){
  	req.prismic.api.query(Prismic.Predicates.at('document.type', 'imagegallery-maggianos-leadership')).then((document) =>{

      if (document) {

      res.json({ document });

    } else {
      res.status(404).send('404 not found');
    }
  }).catch((error) => {
    next(`error when retriving page ${error.message}`);

});
  });

  module.exports=router;