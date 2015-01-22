var inside = require('turf-inside');

/**
 * Takes a {@link FeatureCollection} of {@link Point} features and a {@link FeatureCollection} of {@link Polygon} features and calculates the number of points that fall within the set of polygons.
 *
 * @module turf/count
 * @param {FeatureCollection} polygons a FeatureCollection of {@link Polygon} features
 * @param {FeatureCollection} points a FeatureCollection of {@link Point} features
 * @param {String} countField a field to append to the attributes of the Polygon features representing Point counts
 * @return {FeatureCollection} a FeatureCollection of Polygon features with `countField` appended
 * @example
 * var polygons = turf.featurecollection([
 *  turf.polygon([[
 *    [-112.072391,46.586591],
 *    [-112.072391,46.61761],
 *    [-112.028102,46.61761],
 *    [-112.028102,46.586591],
 *    [-112.072391,46.586591]
 *  ]]),
 *  turf.polygon([[
 *    [-112.023983,46.570426],
 *    [-112.023983,46.615016],
 *    [-111.966133,46.615016],
 *    [-111.966133,46.570426],
 *    [-112.023983,46.570426]
 *  ]])
 * ]);
 * var points = turf.featurecollection([
 *  turf.point([-112.0372, 46.608058], {population: 200}),
 *  turf.point([-112.045955, 46.596264],
 *    {population: 600})
 * ]);
 *
 * var counted = turf.count(polygons, points, 'pt_count');
 *
 * var result = turf.featurecollection(
 *   points.features.concat(counted.features));
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
