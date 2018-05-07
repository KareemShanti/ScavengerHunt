var ObjectFactory = {
   createObject: function(id, objectName, points, nearbyBLEs, objectNFC, startingHint) {
    var newObj = {}
    newObj._id=id;
    newObj.objectName = objectName;
    newObj.points = points;
    newObj.nearbyBLEs = nearbyBLEs;
    newObj.objectNFC=objectNFC;
    newObj.startingHint=startingHint;
       
    return newObj;
  },
  createObjWithObject: function(obj) {
    var newObj = {}
    newObj._id=obj._id;
    newObj.objectName = obj.objectName;
    newObj.points = obj.points;
    newObj.nearbyBLEs = obj.nearbyBLEs;
    newObj.objectNFC= obj.objectNFC;
    newObj.startingHint= obj.startingHint;

    return newObj;
  },
    getId: function() {
    return this._id;
  },
  setId: function(id) {
    this._id = id;
  },
  getObjectName: function() {
    return this.objectName;
  },
  setObjectName: function(objectName) {
    this.objectName = objectName;
  },
  getPoints: function() {
    return this.points;
  },
  setPoints: function(points) {
    this.points = points;
  },
  getNearbyBLEs: function() {
    return this.nearbyBLEs;
  },
  setNearbyBLEs: function(nearbyBLEs) {
    this.nearbyBLEs = nearbyBLEs;
  },
  getObjectNFC: function() {
    return this.objectNFC;
  },
  setObjectNFC: function(objectNFC) {
    this.objectNFC = objectNFC;
  }
}

module.exports=ObjectFactory;
