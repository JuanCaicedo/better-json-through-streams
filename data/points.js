var highland = require('highland');
var oboe = require('oboe');
var fs = require('fs');
var path = require('path');
var request = require('request');

function getPointStream(sourceStream) {
  return highland(function(push, next) {
    oboe(sourceStream)
      .node('{x y color}', function(point) {
        push(null, point);
      })
      .done(function() {
        push(null, highland.nil);
      });
  });
}

function getFullStream() {
  var catPath = path.resolve(__dirname, './cat-points.json');
  var catSource = fs.createReadStream(catPath);
  var catStream = getPointStream(catSource);

  var sunUrl = 'https://raw.githubusercontent.com/JuanCaicedo/better-json-through-streams/master/data/sun-points.json';
  var sunSource = request(sunUrl);
  var sunStream = getPointStream(sunSource);

  return highland([
      catStream,
      sunStream
    ])
    .merge();
}

function getStaticPointStream() {
  var points = [{
    x: 23,
    y: 0,
    color: 'blue'
  }, {
    x: 22,
    y: 1,
    color: 'black'
  }];

  return highland(points);
}

function getStaticMergedStream() {
  var stream1 = highland([{
    x: 23,
    y: 0,
    color: 'blue'
  }]);

  var stream2 = highland([{
    x: 22,
    y: 1,
    color: 'black'
  }]);

  return highland([
      stream1,
      stream2
    ])
    .merge();
}

function getStreamWithCat() {

  var catPath = path.resolve(__dirname, './cat-points.json');
  var catSource = fs.createReadStream(catPath);
  var catStream = getPointStream(catSource);

  var stream2 = highland([{
    x: 22,
    y: 1,
    color: 'black'
  }]);

  return highland([
      catStream,
      stream2
    ])
    .merge();
}

module.exports = {
  getFullStream: getFullStream,
  getStaticPointStream: getStaticPointStream,
  getStaticMergedStream: getStaticMergedStream,
  getStreamWithCat: getStreamWithCat
};
