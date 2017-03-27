var express = require('express');

var MarvelApi = require('../lib/marvelApi');
var router = express.Router();

var marvelApi = new MarvelApi();

/* GET users listing. */
router.get('/characters', function(req, res, next) {
  marvelApi.fetchCharacters(req.query.text).then((resp) => {
    return res.json(resp.data);
  }).catch((err) => {
    return res.json(err);
  })
});

/* GET users listing. */
router.get('/comics/:comicId', function(req, res, next) {
  var comicId = req.params.comicId;

  if (!comicId) {
    return res.json({
      err: 'no comicId given'
    })
  }

  marvelApi.fetchComicInfo(comicId).then((resp) => {
    return res.json(resp.data);
  }).catch((err) => {
    return res.json(err);
  })
});


module.exports = router;