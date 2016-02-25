var express = require('express');
var oboe = require('oboe');
var fs = require('fs');
var path = require('path');
var request = require('request');
var highland = require('highland');
var _ = require('lodash');

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
  var response = {
    exif: {
      software: 'http://make8bitart.com',
      dateTime: '2015-11-07T15:35:13.415Z',
      dateTimeOriginal: '2015-11-07T00:24:05.776Z'
    },
    pixif: {
      pixels: '#{pixels}'
    },
    end: 'test'
  };

  var json = JSON.stringify(response);
  var parts = json.split('#{pixels}');

  var point1 = {
    "index": 105,
    "action": "draw",
    "x": 9,
    "y": 7,
    "originalColor": "transparent",
    "color": "orange",
    "size": 1,
    "drawPathId": 1446859159445
  };

  var point2 = {
    "index": 105,
    "action": "draw",
    "x": 9,
    "y": 7,
    "originalColor": "transparent",
    "color": "orange",
    "size": 1,
    "drawPathId": 1446859159445
  };


  var pointStream = highland([point1, point2])
        .map(point => JSON.stringify(point));

  highland([
      parts[0],
      pointStream,
      parts[1]
    ])
    .invoke('split', [''])
    .sequence()
    .pipe(res);
});

module.exports = router;
