var inside = require('turf-inside');

module.exports = function(polyFC, ptFC, outField, done){
  for (var i = 0; i < polyFC.features.length; i++) {
    var poly = polyFC.features[i];
    if(!poly.properties) poly.properties = {};
    var values = 0;
    for (var j = 0; j < ptFC.features.length; j++) {
      var pt = ptFC.features[j];
      if (inside(pt, poly)) {
        values++;
      }
    }
    poly.properties[outField] = values;
  }

  return polyFC;
};
