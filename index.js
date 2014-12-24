var inside = require('turf-inside'),
    extent = require('turf-extent');

module.exports = function(polyFC, ptFC, outField, done){
  for (var i = 0; i < polyFC.features.length; i++) {
    var poly = polyFC.features[i];
    if(!poly.properties) poly.properties = {};
    var values = 0;
    var bbox = extent(poly);
    for (var j = 0; j < ptFC.features.length; j++) {
      var pt = ptFC.features[j];
      var coords = pt.geometry.coordinates;
      if (coords[0] > bbox[0] &&
        coords[1] > bbox[1] &&
        coords[0] < bbox[2] &&
        coords[1] < bbox[3] &&
        inside(pt, poly)) values++;
    }
    poly.properties[outField] = values;
  }

  return polyFC;
};

