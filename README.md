turf-count
==========
[![Build Status](https://travis-ci.org/Turfjs/turf-count.svg)](https://travis-ci.org/Turfjs/turf-count)

Calculates the number of points that fall within a set of polygons.

```js
var point = require('turf-point')
var polygon = require('turf-polygon')
var featurecollection = require('turf-featurecollection')

var poly1 = polygon([[[0,0],[10,0],[10,10], [0,10]]])
var poly2 = polygon([[[10,0],[20,10],[20,20], [20,0]]])
var polyFC = featurecollection([poly1, poly2])
var pt1 = point(5,5, {population: 200})
var pt2 = point(1,3, {population: 600})
var ptFC = featurecollection([pt1, pt2])

var counted = count(polyFC, ptFC, 'pt_count')

console.log(counted)
```
