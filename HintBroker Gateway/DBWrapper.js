var DBWrapper = {
  /**
  * Initializes DbWrapper
  * @method init
  * @param {String} dbName - Name of the database to open, Must be lowercase
  * @param {Object} options - optional argument with parameters:
  *                         --- {String} ipAddress : Ip Address of the Database (defaults to '127.0.0.1')
  *                         --- {String} portNum : Port Number of the Database (defaults to '5984')
  *                         --- {Boolean} create : Boolean flag to determine if the wrapper should create the database (typically for first time use)
  *                         --- {Function} callback : function to be called upon the creation of a database (Should be used if create is true)
  * @return {Object} - copy of the created object
  **/
  init: function (dbName, options) {
    var cradle = require('cradle');
    var netAddress = '';
    // if options are provided
    if(typeof options !== 'undefined') {
      //if ipaddress and portnumber are given then use them
      if(typeof options.ipAddress !== 'undefined' && typeof options.portNum !== 'undefined') {
        netAddress = options.ipAddress + ':' + options.portNum
        c = new(cradle.Connection)(netAddress);
      }
      else
        c = new(cradle.Connection)();
    }
    else
        c = new(cradle.Connection)();
    this.db = c.database(dbName);
    //if options are provided
    if(typeof options !== 'undefined') {
      //if create is given then check if true
      if (typeof options.create !== 'undefined'){
        if(options.create == true) {
          //create db
          this.db.create((err)=>{
            //console.error(err);
            //IF callback is provided, then call it
            if(typeof options.callback !== 'undefined'){
              options.callback(err);
            }
          });
        }
      }
    }
    return this;
  },
  /**
  * Retreives Document by ID
  * @method getDocument
  * @param {String} id - id of the document to retreive
  * @param {Function} callback - user defined callback function with parameters err and doc
  **/
  getDocument: function (id, callback){
    this.db.get(id, function (err, doc) {
        callback(err, doc);
    });
  },
  /**
  * Saves Document
  * @method saveDocument
  * @param {String} id - id of the document to store
  * @param {Object} data - data to be stored
  * @param {Function} callback - user defined callback function with parameters err and res
  **/
  saveDocument: function (id, data, callback) {
    this.db.save(id, data, function (err, res) {
        callback(err, res);
    });
  },
  /**
  * Creates View
  * @method createView
  * @param {String} designDocument - designDocument to store view in
  * @param {String} viewName - name of the view to be created
  * @param {Function} func - user defined function
  **/
  createView: function (designDocument, viewName, func) {
    var obj = {
      views: {}
    };
    obj.views[viewName] = {
      map: func
    };
    this.db.save('_design/' + designDocument, obj);
  },
  /**
  * Run view
  * @method view
  * @param {String} path - path of view to be executed
  * @param {Function} callback - user defined callback function with parameters err and res
  **/
  view: function (path, callback) {
      this.db.view(path, function (err, res) {
        callback(err, res);
    });
  },
  /**
  * update data in a document
  * @method update
  * @param {String} id - id of the document to be updated
  * @param {object} updatedData - All the keys given in this object will be overridden, all else will not be changed
  * @param {Function} callback - user defined callback function with parameters err and res
  **/
  update: function(id, updatedData, callback) {
    this.db.merge(id, updatedData, callback);
  },
  /**
  * delete document
  * @method delete
  * @param {String} id - id of the document to be deleted
  * @param {String} rev - latest revision of the document to be deleted
  * @param {Function} callback - user defined callback function with parameters err and res
  **/
  delete: function(id, rev, callback) {
    this.db.remove(id, rev, callback);
  }
};
 
module.exports = DBWrapper;
