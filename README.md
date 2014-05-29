turf-count
==========

Calculates the number of points that fall within a set of polygons.

## Install

    npm install turf-count

## API

### `count(polygonCollection, pointCollection, countProperty)`

* `polygonCollection` should be a FeatureCollection of Polygons
* `pointCollection` should be a FeatureCollection of Points
* `countProperty` is the property in the returned FeatureCollection that records the count of points in each polygon.

## Example

```js
var poly1 = polygon([[[0,0],[10,0],[10,10], [0,10]]])
var poly2 = polygon([[[10,0],[20,10],[20,20], [20,0]]])
var polyFC = featurecollection([poly1, poly2])
var pt1 = point(5,5, {population: 200})
var pt2 = point(1,3, {population: 600})
var ptFC = featurecollection([pt1, pt2])
var counted = count(polyFC, ptFC, 'pt_count')
```
