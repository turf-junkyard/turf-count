var inside = require('turf-inside');

/**
 * Calculates the number of points that fall within a set of polygons.
 *
 * @module turf/count
 * @param {FeatureCollection} polyFC a FeatureCollection of {@link Polygon} features
 * @param {FeatureCollection} pointFC a FeatureCollection of {@link Point} features
 * @param {String} countField a field to append to the attributes of the Polygon features representing Point counts
 * @return {FeatureCollection} a FeatureCollection of Polygon features with `countField` appended
 * @example
 * var poly1 = turf.polygon([[
 *  [-112.072391,46.586591],
 *  [-112.072391,46.61761],
 *  [-112.028102,46.61761],
 *  [-112.028102,46.586591],
 *  [-112.072391,46.586591]
 * ]]);
 * var poly2 = turf.polygon([[
 *  [-112.023983,46.570426],
 *  [-112.023983,46.615016],
 *  [-111.966133,46.615016],
 *  [-111.966133,46.570426],
 *  [-112.023983,46.570426]
 * ]]);
 * var polyFC = turf.featurecollection([poly1, poly2]);
 * var pt1 = turf.point(-112.0372, 46.608058, {population: 200});
 * var pt2 = turf.point(-112.045955, 46.596264,
 *  {population: 600});
 * var ptFC = turf.featurecollection([pt1, pt2]);
 *
 * var counted = turf.count(polyFC, ptFC, 'pt_count');
 *
 * var result = turf.featurecollection(
 *   ptFC.features.concat(counted.features));
 *
 * //=result
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
