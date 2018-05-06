
var ObjectFactory = require('./ObjectFactory.js');
 
var ObjectManager = { 
      /**
  * Initializes Object Manager
  * @method init
  * @param {Object} options  - optional argument for database setup with parameters:
  *                         --- {String} ipAddress : Ip Address of the Database (defaults to '127.0.0.1')
  *                         --- {String} portNum : Port Number of the Database (defaults to '5984')
  *                         --- {Boolean} create : Boolean flag to determine if the wrapper should create the database (typically for first time use)
  *                         --- {Function} callback : function to be called upon the creation of a database (Should be used if create is true)
  * @return {Object} - copy of the created object
  ***/
  init: function(options) {
    //note to self: retreive db name from resource file
    this.dbName = 'objects_db';
 
    this.db = require('./DbWrapper.js').init(this.dbName, options);
       
    return this;
  },
    /**
  * Gets all the objects in the DB
  * @method getAllObjects
  * @param {Function} callback - user defined callback function with parameter objects
  **/ 
  getAllObjects: function(callback) { 
    this.db.view('objects/objectsAll', function (err, res) {
        var objects = [];
        if(res!==undefined){
            res.forEach(function (row)
      { 
        var obj = ObjectFactory.createObjWithObject(row);
        objects.push(obj);
      });}
       
      callback(objects);
    })
  },
    /**
  * Checks if an object exists in the DB using its _id
  * @method checkExistingObject
  * @param {String} objectId - the _id to be checked
  * @param {Function} callback - user defined callback function with boolean parameter
  **/
  checkExistingObject: function(objectId, callback) {
      console.log('got to om');
      var obj =this.db.getDocument(objectId, function(err, doc){
          console.log('got to om cb')
          if(doc=== undefined){
            callback(false);
          }
           
          else{
            callback(true);
          }
           
      });
  },
     /**
  * Gets an object from the DB based on id
  * @method getObjectById
  * @param {String} objectId - the id used to retrieve the object
  * @param {Function} callback - user defined callback function
  **/
  getObjectById: function(objectId, callback) {
      var obj =this.db.getDocument(objectId, function(err, doc){
          callback(err, doc);   
      });
  },
   /**
  * Adds object to the DB
  * @method addObject
  * @param {Object} object - Object with all the required parameters (Refer to ObjectFactory for more information)
  * @param {Function} callback - user defined callback function with parameters err and res
  **/
  addObject: function(object, callback) {
    this.db.saveDocument(object._id,
    {
      objectName: object.objectName,
      points: object.points,
      nearbyBLEs: object.nearbyBLEs,
      objectNFC: object.objectNFC
    }, callback);
  },
  /**
  * Updates an object's name in the DB
  * @method updateObjectName
  * @param {String} objectId - The id of the object to be updated
  * @param {String} updatedName - The new name of the object 
  * @param {Function} callback - user defined callback function
  **/
  updateObjectName: function(objectId, updatedName, callback) {
      this.db.update(objectId, {objectName: updatedName}, function (err, res){
          callback(err, res);
      });
  },
  /**
  * Updates an object's BLEs in the DB
  * @method updateObjectBLE
  * @param {String} objectId - The id of the object to be updated
  * @param {String} updatedBLE - The new BLE list of the object 
  * @param {Function} callback - user defined callback function
  **/
  updateObjectBLE: function(objectId, updatedBLE, callback) {
      this.db.update(objectId, {nearbyBLEs: updatedBLE}, function (err, res){
          callback(err, res);
      });
  },
  /**
  * Updates an object's NFC in the DB
  * @method updateObjectNFC
  * @param {String} objectId - The id of the object to be updated
  * @param {String} updatedNFC - The new NFC of the object 
  * @param {Function} callback - user defined callback function
  **/
  updateObjectNFC: function(objectId, updatedNFC, callback) {
      this.db.update(objectId, {objectNFC: updatedNFC}, function (err, res){
          callback(err, res);
      });
  },
  /**
  * Updates an object's points in the DB
  * @method updateObjectPoints
  * @param {String} objectId - The id of the object to be updated
  * @param {String} updatedPoints - The new points of the object 
  * @param {Function} callback - user defined callback function
  **/
  updateObjectPoints: function(objectId, updatedPoints, callback) {
      this.db.update(objectId, {points: updatedPoints}, function (err, res){
          callback(err, res);
      });
  },
   /**
  * Deletes an object from the DB
  * @method deleteObject
  * @param {String} objectId - The id of the object to be deleted
  * @param {Function} callback - user defined callback function
  **/
  deleteObject: function(objectId, callback) {
      this.getObjectById(objectId, function(err, doc){
          if(doc!== undefined){
            ObjectManager.db.delete(doc._id, doc._rev, callback);
          }
           
          else
              callback(err,doc);
        });
    
      },
    
    
    getObjectByName: function(name, callback){
            this.getAllObjects((objects)=>{
                objects.forEach((row)=>{
                    if(row.objectName==name){
                    callback(row)
}
});
    
});
    }
}
 
module.exports=ObjectManager;
