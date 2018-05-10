const express = require('express')
  , router = express.Router();
const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const request = require('request');
const Cookies = require('cookies');
const PrismicConfig = require('../../prismic-configuration');
const Onboarding = require('../../onboarding');
const app = require('../../config');
const path= require('path');

router.get('/help', (req, res) => {
  const repoRegexp = /^(https?:\/\/([-\w]+)\.[a-z]+\.(io|dev))\/api(\/v2)?$/;
  const [_, repoURL, name, extension, apiVersion] = PrismicConfig.apiEndpoint.match(repoRegexp);
  const { host } = req.headers;
  const isConfigured = name !== 'your-repo-name';
  res.render('help', {
    isConfigured,
    repoURL,
    name,
    host,
  });
});

router.get('/preview', (req, res) => {
  const { token } = req.query;
  if (token) {
    req.prismic.api.previewSession(token, PrismicConfig.linkResolver, '/').then((url) => {
      const cookies = new Cookies(req, res);
      cookies.set(Prismic.previewCookie, token, { maxAge: 30 * 60 * 1000, path: '/', httpOnly: false });
      res.redirect(302, url);
    }).catch((err) => {
      res.status(500).send(`Error 500 in preview: ${err.message}`);
    });
  } else {
    res.send(400, 'Missing token from querystring');
  }
});

router.get('/brinker/:uid', (req, res, next) => {
  const uid = req.params.uid;
  req.prismic.api.getByUID('brinker', uid).then((document) => {
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