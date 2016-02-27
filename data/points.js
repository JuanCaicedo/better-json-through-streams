var highland = require('highland');
var oboe = require('oboe');
var fs = require('fs');
var path = require('path');
var filePath = path.resolve(__dirname, '../points.json');
var readStream = fs.createReadStream(filePath);

function getStream() {
  var dataStream = highland(readFile);
  return dataStream;
}

function readFile(push, next) {
  var fileStream = fs.createReadStream(filePath);
  oboe(fileStream)
    .node('{x y color}', function(point) {
      push(null, point);
    })
    .done(function() {
      push(null, highland.nil);
    });
}

module.exports = {
  getStream: getStream
};
