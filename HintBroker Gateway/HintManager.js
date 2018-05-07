var HintFactory = require('./HintFactory.js');

var HintManager = {
      /**
  * Initializes Hint Manager
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
    this.dbName = 'hints_db';

    this.db = require('./DbWrapper.js').init(this.dbName, options);

    return this;
  },
  /**
  * Gets all the hints in the DB
  * @method getAllHints
  * @param {Function} callback - user defined callback function with parameter Hints
  **/
  getAllHints: function(callback) {
    this.db.view('hints/hintsAll', function (err, res) {
        var hints = [];
        if(res!==undefined){
            res.forEach(function (row) {
              var obj = HintFactory.createHintWithObject(row);
              hints.push(obj);
            });
      }
      callback(hints);
    })
  },
  /**
  * Gets a Hint from the DB based on id
  * @method getHintById
  * @param {String} hintId - the id used to retrieve the Hint
  * @param {Function} callback - user defined callback function
  **/
  getHintById: function(hintId, callback) {
      var obj =this.db.getDocument(hintId, function(err, doc){
          callback(err, doc);
      });
  },
  /**
  * Adds hint to the DB
  * @method addHint
  * @param {Object} Hint - Hint with all the required parameters (Refer to HintFactory for more information)
  * @param {Function} callback - user defined callback function with parameters err and res
  **/
  addHint: function(hint, callback) {
    this.db.saveDocument(hint._id,
    {
      objectName: hint.objectName,
      hint: hint.hint,
      state: hint.state
    }, callback);
  },
  /**
  * Gets list of hints in MQTT format
  * @method getMQTTList
  * @param {Function} callback - user defined callback function with parameter MQTTList
  **/
  getMQTTList: function(callback) {
    this.getAllHints((hints) => {
      var MQTTList = [];
      hints.forEach((row) => {
        var buffer = {};
        var path = row.objectName + "/" + row.state + "/" + row._id;
        buffer[path] = row.hint;
        MQTTList.push(buffer);
      });
      callback(MQTTList);
    });
  },
  /**
  * Deletes a hint from the DB
  * @method deleteHint
  * @param {String} hintId - The id of the hint to be deleted
  * @param {Function} callback - user defined callback function
  **/
  deleteHint: function(hintId, callback) {
      function deleteCallback(err, doc) {
        if(doc!== undefined)
          this.db.delete(doc._id, doc._rev, callback);
        else
          callback(err,doc);
      }
      this.getHintById(hintId, deleteCallback.bind(this));
    }
}

module.exports=HintManager;
