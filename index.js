var inside = require('turf-inside');

/**
* Calculates the number of points that fall within a set of polygons.
*
* @module turf/count
* @param {FeatureCollection} polyFC - a FeatureCollection of polygons
* @param {FeatureCollection} pointFC - a FeatureCollection of points
* @param {String} countField - a field to append to the attributes of the polygon features representing point counts
* @return {FeatureCollection} counted - a FeatureCollection of polygons with a point count attribute appended
* @example
* var poly1 = turf.polygon([[[0,0],[10,0],[10,10], [0,10]]]);
* var poly2 = turf.polygon([[[10,0],[20,10],[20,20], [20,0]]]);
* var polyFC = turf.featurecollection([poly1, poly2]);
* var pt1 = turf.point(5,5, {population: 200});
* var pt2 = turf.point(1,3, {population: 600});
* var ptFC = turf.featurecollection([pt1, pt2]);
*
* var counted = turf.count(polyFC, ptFC, 'pt_count');
*
* //=counted
*/

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
