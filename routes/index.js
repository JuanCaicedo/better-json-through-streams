var express = require('express');
var oboe = require('oboe');
var fs = require('fs');
var path = require('path');
var request = require('request');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/home', function(req, res) {
  res.render('home');
});

router.get('/data', function(req, res) {
  var filePath = path.resolve(__dirname, '../points.json');
  var readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

module.exports = router;
