var highland = require('highland');
var oboe = require('oboe');
var fs = require('fs');
var path = require('path');

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

function getDataStream() {
  var catPath = path.resolve(__dirname, './cat-points.json');
  var catSource = fs.createReadStream(catPath);
  var catStream = getPointStream(catSource);

  var sunPath = path.resolve(__dirname, './sun-points.json');
  var sunSource = fs.createReadStream(sunPath);
  var sunStream = getPointStream(sunSource);

  return highland([
    catStream,
    sunStream
  ]).merge();
}


module.exports = {
  getDataStream: getDataStream
};
