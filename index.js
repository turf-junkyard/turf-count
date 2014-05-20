var ss = require('simple-statistics')
var inside = require('turf-inside')

module.exports = function(polyFC, ptFC, inField, outField, done){
  polyFC.features.forEach(function(poly){
    if(!poly.properties){
      poly.properties = {}
    }
    var values = []
    ptFC.features.forEach(function(pt){
      if (inside(pt, poly)) {
        values.push(pt.properties[inField]);
      }
    })
    poly.properties[outField] = values.length
  })

  return polyFC;
}
