/**
* Please include this file in the same directory as ObjectManager and ObjectFactory
**/
var ObjectManager = require('./ObjectManager.js');
var objectFactory = require('./ObjectFactory.js');

/**
* The DB in use is called 'objects_db', please create it before attempting to add hints
* The init function may create the DB for you, please refer to the ObjectManager for the init function documentation
**/
var objectManager = ObjectManager.init({});

/**
* The commented segment below will allow you to create Hunt objects in the
* appropriate format for the scavenger hunt
* The parameter descriptions are provided respectively
* @param {String} id - Unique id for the Scavenger Hunt
* @param {String} huntName - Name of the scavenger hunt to be added
* @param {String} points - The points that the user will receive upond completion
* @param {String} startingHint - The Hint to be displayed when the hunt is started
**/

/*
var o1 = objectFactory.createObject('1234', 'Hunt1', '80', 'Go To X');
var o2 = objectFactory.createObject('1212', 'Hunt2', '70', 'Go To X');
var o3 = objectFactory.createObject('3131', 'Hunt3', '60', 'Go To X');
var o4 = objectFactory.createObject('4141', 'Hunt4', '50', 'Go To X');
var o5 = objectFactory.createObject('5151', 'Hunt5', '40', 'Go To X');
var o6 = objectFactory.createObject('6161', 'Hunt6', '30', 'Go To X');
var o7 = objectFactory.createObject('7171', 'Hunt7', '20', 'Go To X');
*/

/**
* To add a hunt, simply provide the hunt's object name as the first parameter of the addObject function.
* Keep the callback as is.
**/

/*
objectManager.addObject(o1, (err, res)=> {
  if(!err)
    console.log('success');
  else {
    console.error(err)
  }
});
objectManager.addObject(o2, (err, res)=> {
  if(!err)
    console.log('success');
  else {
    console.error(err)
  }
});
objectManager.addObject(o3, (err, res)=> {
  if(!err)
    console.log('success');
  else {
    console.error(err)
  }
});
objectManager.addObject(o4, (err, res)=> {
  if(!err)
    console.log('success');
  else {
    console.error(err)
  }
});
objectManager.addObject(o5, (err, res)=> {
  if(!err)
    console.log('success');
  else {
    console.error(err)
  }
});
objectManager.addObject(o6, (err, res)=> {
  if(!err)
    console.log('success');
  else {
    console.error(err)
  }
});
objectManager.addObject(o7, (err, res)=> {
  if(!err)
    console.log('success');
  else {
    console.error(err)
  }
});
*/
