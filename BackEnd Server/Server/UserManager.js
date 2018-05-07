var userFactory = require('./UserFactory');

let UserManager = {
  /**
  * Initializes User Manager
  * @method init
  * @param {Object} options  - optional argument for database setup with parameters:
  *                         --- {String} ipAddress : Ip Address of the Database (defaults to '127.0.0.1')
  *                         --- {String} portNum : Port Number of the Database (defaults to '5984')
  *                         --- {Boolean} create : Boolean flag to determine if the wrapper should create the database (typically for first time use)
  *                         --- {Function} callback : function to be called upon the creation of a database (Should be used if create is true)
  * @return {Object} - copy of the created object
  **/
  init: function(options) {
    //note to self: retreive db name from resource file
    this.dbName = 'users_db'

    this.db = require('./DbWrapper.js').init(this.dbName, options);

    return this;
  },
  /**
  * Retreives All Users In The Database
  * @method getAllUsers
  * @param {Function} callback - user defined callback function with parameter users
  **/
  getAllUsers: function(callback) {
    //note to self: retreive design path from resource file
    this.db.view('users/usersAll', (err, res) => {
      var users = [];
      res.forEach((row) => {
        var user = userFactory.createUserWithObject(row);
        users.push(user);
      });
      callback(users);
    });
  },
  /**
  * Checks if username already exists in DB
  * @method checkExistingUsername
  * @param {String} username - username to be checked
  * @param {Function} callback - user defined callback function with boolean parameter
  **/
  checkExistingUsername: function(username, callback) {
    this.db.getDocument(username, function(err, doc){
      //if error then username does not exist
      if(err)
      callback(false);
      //else username exists
      else {
        callback(true);
      }
    });
  },
  /**
  * Checks if the email has already been used by another user
  * @method checkExistingEmail
  * @param {String} email - email to be checked
  * @param {Function} callback - user defined callback function with boolean parameter
  **/
  checkExistingEmail: function(email, callback) {
    //note to self: retreive view path from resource file
    this.db.view('users/getAllEmails', (err, res) => {
      var flag = false;
        if(res!==undefined){
      res.forEach((row) => {
        if (row.email == email){
          flag = true;
          callback(flag);
        }
      });
    }
      if(!flag) {
        console.log("FLAG IS FALSE");
        callback(false);
      }
    });
  },
  /**
  * Adds user to the DB
  * @method addUser
  * @param {Object} user - User object with all the required parameters (Refer to UserFactory for more information)
  * @param {Function} callback - user defined callback function with parameters err and res
  **/
  addUser: function(user, callback) {
    this.db.saveDocument(user._id,
      {
        password: user.password,
        email: user.email,
        score: user.score,
        redeemedObjects: user.redeemedObjects
      }, callback);
    },
  /**
  * Updates User info in the DB
  * @method updateUser
  * @param {String} username - username to be updated
  * @param {Object} updatedData - object with data to be updated
  * @param {Function} callback - user defined callback function with parameters err and res
  **/
  updateUser: function(username, updatedData, callback) {
    this.db.update(username, updatedData, callback);
  },
  /**
  * Updates a User's password in the DB
  * @method updatePassword
  * @param {String} username - username to be updated
  * @param {String} newPassword - User's new password to be stored
  * @param {Function} callback - user defined callback function with parameters err and res
  **/
  updatePassword: function(username, newPassword, callback){
    this.db.update(username, {password: newPassword}, callback);
  },
  /**
  * Authenticates user from password
  * @method authenticateUser
  * @param {String} username - User's username
  * @param {String} password - User's entered password with MD5 hash
  * @param {Function} callback - user defined function with boolean parameter
  **/
  authenticateUser: function(username, password, callback) {
    this.db.getDocument(username, (err, doc) => {
      //if an error occurs display it
      if(err) {
        console.error(err);
        callback(false);
      }
      else {
        console.log("Entered pass: " + password);
        console.log("Available pass: " + doc.password);
        if(password == doc.password)
          callback(true);
        else {
          callback(false);
        }
      }
    })
  },
  /**
  * Retreives user info by passing the username
  * @method getUserByUsername
  * @param {String} username - username of the user to be retreived
  * @param {Function} callback - user defined function with err and res parameters
  **/
  getUserByUsername: function(username, callback) {
    this.db.getDocument(username, function(err, doc){
          callback(err, doc);   
      });
  },
  /**
  * Delete User
  * @method deleteUser
  * @param {String} username - username
  * @param {Function} callback - user defined callback function with parameters err and res
  **/
  deleteUser: function(username, callback) {
    //retreive document to get latest revision id
    this.getUserByUsername(username, (err, doc) => {
      this.db.delete(doc._id, doc._rev, callback);
    });
  },
  /**
  * Retreives leader board sorted in descending order of score
  * @method getSortedLeaderBoard
  * @param {Function} callback - user defined callback function with a leaderboard parameter
  **/
  getSortedLeaderBoard: function(callback) {
    //retreive all entries
    this.getAllUsers((users) => {
      // Sort the array of objects in descending order of score
      users.sort((a, b) => {
        return b.score - a.score;
      });
      var leaderboard = [];
      // push each User's username and score into the leaderboard array
      users.forEach((user) => {
        var buffer = {};
        buffer.username = user._id;
        buffer.score = user.score;
        leaderboard.push(buffer);
      });
      callback(leaderboard);
    });
  },
  /**
  * Adds new object to the User's object list and adds the object's points to the User's score
  * @method redeemObject
  * @param {String} username - username to be updated
  * @param {String} objectId - object to be added to the User's List
  * @param {String} objectPoints - points to be added to the User's cummulative score
  * @param {Function} callback - user defined callback function with parameters err and res
  **/
  redeemObject: function(username, objectId, objectPoints, callback) {
    //Binding forces us to define the callback beforehand
    var callbackSetup = function (err, doc) {
      //if there was an error fetching the document pass the error to the callback
      if (err)
        callback(err);
      else {
        //build user object
        var user = userFactory.createUserWithObject(doc);
        //push new object to array
        user.redeemedObjects.push(objectId);
        //retreive current score
        var currScore = parseInt(user.score);
        //compute new score
        var newScore = currScore + parseInt(objectPoints);
        //store new score
        user.score = newScore.toString();
        //update the user's db entry
        this.updateUser(user._id, {score: user.score, redeemedObjects: user.redeemedObjects}, callback);
      }
    }

    this.db.getDocument(username, callbackSetup.bind(this));
  },
  /**
  * Checks if the User already redeemed the object
  * @method checkRedeemed
  * @param {String} username - username to be checked
  * @param {String} objectId - object in question
  * @param {Function} callback - user defined function with boolean parameter
  **/
  checkRedeemed: function(username, objectId, callback) {
    // retreive document
    this.getUserByUsername(username, (err, res) => {
      if(err)
        console.error(err);
      else {
        var flag = false;
        // iterate through list of redeemed objects
        if(res.redeemedObjects.length>0)
        {
        res.redeemedObjects.forEach((object) => {
          //if a match is made then the object is already redeemed

          if(objectId == object){

            flag = true;
            callback(flag);
          }
        });
      }
        if(!flag)
          //user has not redeemed object yet
          callback(flag);
      }
    });
  }
}

module.exports = UserManager;
