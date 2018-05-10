const express = require('express')
  , router = express.Router();

  const welcome = require('./welcomeController');
  const factsheet = require('./factsheetController');
  const imagegallery = require('./imagegalleryController');
  const leadership = require('./leadershipController');
  const prismic = require('./prismicController');

  router.use('/welcome',welcome);
  router.use('/factsheet',factsheet);
  router.use('/imagegallery',imagegallery);
  router.use('/leadership',leadership);
  router.use('/prismic',prismic);

  module.exports = router;