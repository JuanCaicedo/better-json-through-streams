var highland = require('highland');

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

function getStream() {
  return highland([
    point1,
    point2
  ]);
}

module.exports = {
  getStream: getStream
};
