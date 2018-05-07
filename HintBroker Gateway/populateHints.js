/**
* Please include this file in the same directory as HintManager and HintFactory
**/
var HintManager = require('./HintManager.js');
var HintFactory = require('./HintFactory.js');

/**
* The DB in use is called 'hints_db', please create it before attempting to add hints
* The init function may create the DB for you, please refer to the HintManager for the init function documentation
**/
var hintManager = HintManager.init({});

/**
* The commented segment below will allow you to create hint objects in the
* appropriate format for the scavenger hunt
* The parameter descriptions are provided respectively
* @param {String} id - The minor id of the beacon that will trigger the hint (The beacon id is also the document id, so it is one hint per beacon).
* @param {String} huntName - The name of the hunt that the hint corresponds to (Must be the same as the object name in the objects DB).
* @param {String} hint - The hint that is displayed to the user
* @param {String} stage - the stage that the hint corresponds to (Stage 1 is provided by the document in objects DB, it is provided as startingHint).
**/

/*
var h1 = HintFactory.createHint('62746', 'Party-Time', 'Stage 1 completed', '2'); //white
var h2 = HintFactory.createHint('14867', 'Party-Time', 'Stage 2 Completed', '3'); //
var h3 = HintFactory.createHint('1', 'Party-Time', 'Stage 3 Completed', '4');
var h4 = HintFactory.createHint('6478', 'Party-Time', 'end', '5');
var h5 = HintFactory.createHint('', '', '', '');
var h6 = HintFactory.createHint('', '', '', '');
var h7 = HintFactory.createHint('', '', '', '');
var h8 = HintFactory.createHint('', '', '', '');
*/

/**
* To add a hint, simply provide the hint's object name as the first parameter of the addHint function.
* Keep the callback as is.
**/

/*
hintManager.addHint(h1, (err, res)=> {
  if(!err)
    console.log('success');
  else {
    console.error(err)
  }
});
hintManager.addHint(h2, (err, res)=> {
  if(!err)
    console.log('success');
  else {
    console.error(err)
  }
});
hintManager.addHint(h3, (err, res)=> {
  if(!err)
    console.log('success');
  else {
    console.error(err)
  }
});
hintManager.addHint(h4, (err, res)=> {
  if(!err)
    console.log('success');
  else {
    console.error(err)
  }
});
hintManager.addHint(h5, (err, res)=> {
  if(!err)
    console.log('success');
  else {
    console.error(err)
  }
});
hintManager.addHint(h6, (err, res)=> {
  if(!err)
    console.log('success');
  else {
    console.error(err)
  }
});
hintManager.addHint(h7, (err, res)=> {
  if(!err)
    console.log('success');
  else {
    console.error(err)
  }
});
*/
