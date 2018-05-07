var HintManager = require('./HintManager.js');
var HintFactory = require('./HintFactory.js');

var hintManager = HintManager.init({});

var h1 = HintFactory.createHint('1234', 'hunt1', 'Go To EB1', '1');
var h2 = HintFactory.createHint('5678', 'hunt2', 'Go To EB2', '1');
var h3 = HintFactory.createHint('9012', 'hunt3', 'Go To EB3', '1');
var h4 = HintFactory.createHint('3456', 'hunt4', 'Go To SBA', '1');
var h5 = HintFactory.createHint('7890', 'hunt5', 'Go To CAAD', '1');
var h6 = HintFactory.createHint('1212', 'hunt6', 'Go To LAN', '1');
var h7 = HintFactory.createHint('2323', 'hunt7', 'Go To Physics', '1');
hintManager.getMQTTList((obj) => {
  console.log(obj);
  obj.forEach((row) => {
    console.log(Object.keys(row)[0]);
  });
});
/*
hintManager.addHint(h1, (err, res)=> {
  if(!err)
    console.log('success');
});
hintManager.addHint(h2, (err, res)=> {
  if(!err)
    console.log('success');
});
hintManager.addHint(h3, (err, res)=> {
  if(!err)
    console.log('success');
});
hintManager.addHint(h4, (err, res)=> {
  if(!err)
    console.log('success');
});
hintManager.addHint(h5, (err, res)=> {
  if(!err)
    console.log('success');
});
hintManager.addHint(h6, (err, res)=> {
  if(!err)
    console.log('success');
});
hintManager.addHint(h7, (err, res)=> {
  if(!err)
    console.log('success');
});
*/
/*
userManager.redeemObject(u1._id, '12345', '100', (err, res) => {
  if(!err)
    console.log('success');
});
userManager.redeemObject(u2._id, '12345', '100', (err, res) => {
  if(!err)
    console.log('success');
});
userManager.redeemObject(u3._id, '12345', '100', (err, res) => {
  if(!err)
    console.log('success');
});
userManager.redeemObject(u4._id, '12345', '100', (err, res) => {
  if(!err)
    console.log('success');
});
userManager.redeemObject(u5._id, '12345', '100', (err, res) => {
  if(!err)
    console.log('success');
});
userManager.redeemObject(u6._id, '12345', '100', (err, res) => {
  if(!err)
    console.log('success');
});
userManager.redeemObject(u7._id, '12345', '100', (err, res) => {
  if(!err)
    console.log('success');
});
*/
/*
userManager.deleteUser(u1._id, (err, res) =>{
  if(err)
    console.error(err);
  else {
    console.log(res);
  }
});*/
/*
userManager.getSortedLeaderBoard((leaderboard) => {
  console.log(leaderboard);
})*/
