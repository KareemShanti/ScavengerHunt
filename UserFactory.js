var UserFactory = {
  /**
  * Creates a DB compatible User object from parameters
  * @method createUser
  * @param {String} username - User's username
  * @param {String} password - User's password
  * @param {String} email - User's Email
  * @param {String} score - User's Score
  * @param {Array} redeemedObjects - List of objects already redeemed by user
  * @return {Object} - DB compatible user object
  **/
  createUser: function(username, password, email, score, redeemedObjects) {
    var userObject = {};
    userObject._id = username;
    userObject.password = password;
    userObject.email = email;
    userObject.score = score;
    userObject.redeemedObjects = redeemedObjects;

    return userObject;
  },
  /**
  * Creates a DB compatible User object from a given object
  * @method createUserWithObject
  * @param {Object} obj - Object containing the user's details
  * @return {Object} - DB compatible user object
  **/
  createUserWithObject: function(obj) {
    var userObject = {};
    userObject._id = obj._id;
    userObject.password = obj.password;
    userObject.email = obj.email;
    userObject.score = obj.score;
    userObject.redeemedObjects = obj.redeemedObjects;

    return userObject;
  },
  /**
  * Creates a DB compatible User object from current object values
  * @method createUserWithFactory
  * @return {Object} - DB compatible user object
  **/
  createUserWithFactory: function() {
    var userObject = {};
    userObject._id = this.username;
    userObject.password = this.password;
    userObject.email = this.email;
    userObject.score = this.score;
    userObject.redeemedObjects = this.redeemedObjects;

    return userObject;
  },
  /**
  * Get Username from this
  * @method getUsername
  * @return {String} - Username stored in this object reference
  */
  getUsername: function() {
    return this.username;
  },
  /**
  * Set username in object
  * @method setUsername
  * @param {String} username - Username to set
  **/
  setUsername: function(username) {
    this.username = username;
  },
  /**
  * Get Password from this
  * @method getPassword
  * @return {String} - Password stored in this object reference
  */
  getPassword: function() {
    return this.password;
  },
  /**
  * Set Password in object
  * @method setPassword
  * @param {String} password - Password to set
  **/
  setPassword: function(password) {
    this.password = password;
  },
  /**
  * Get Email from this
  * @method getEmail
  * @return {String} - Email stored in this object reference
  */
  getEmail: function() {
    return this.email;
  },
  /**
  * Set Email in object
  * @method setEmail
  * @param {String} email - Email to set
  **/
  setEmail: function(email) {
    this.email = email;
  },
  /**
  * Get Score from this
  * @method getScore
  * @return {String} - Score stored in this object reference
  */
  getScore: function() {
    return this.score;
  },
  /**
  * Set Score in object
  * @method setScore
  * @param {String} Score - Score to set
  **/
  setScore: function(score) {
    this.score = score;
  }
}

module.exports = UserFactory;
