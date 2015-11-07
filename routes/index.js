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
  var filePath = path.resolve(__dirname, '../all-cards.json');
  var readStream = fs.createReadStream(filePath);
  readStream.pipe(res)
  // res.write('[')
  // oboe(readStream)
  //   .node('!.{}', function(item){
  //     res.write(JSON.stringify(item));
  //   })
  //   .done(function(full){
  //     res.write(']');
  //     res.end();
  //   });
});

module.exports = router;
