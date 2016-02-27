var highland = require('highland');
var oboe = require('oboe');
var fs = require('fs');
var path = require('path');

function getPointStream(filePath) {
  return highland(function(push, next) {
    var fileStream = fs.createReadStream(filePath);
    oboe(fileStream)
      .node('{x y color}', function(point) {
        push(null, point);
      })
      .done(function() {
        push(null, highland.nil);
      });
  });
}

function getStream() {
  var catPath = path.resolve(__dirname, './cat-points.json');
  var sunPath = path.resolve(__dirname, './sun-points.json');

  var catStream = getPointStream(catPath);
  var sunStream = getPointStream(sunPath);
  return highland([
    sunStream,
    catStream
  ]).merge();
}


module.exports = {
  getStream: getStream
};
