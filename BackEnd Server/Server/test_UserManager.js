var userManager = require('./UserManager.js').init({});
var userFactory = require('./UserFactory.js');

var u1 = userFactory.createUser('user1', 'pass1', 'e1', '10', ['o1']);
var u2 = userFactory.createUser('user2', 'pass2', 'e2', '20', ['o2']);
var u3 = userFactory.createUser('user3', 'pass3', 'e3', '30', ['o3']);
var u4 = userFactory.createUser('user4', 'pass4', 'e4', '40', ['o4']);
var u5 = userFactory.createUser('user5', 'pass5', 'e5', '50', ['o5']);
var u6 = userFactory.createUser('user6', 'pass6', 'e6', '60', ['o6']);
var u7 = userFactory.createUser('user7', 'pass7', 'e7', '70', ['o7']);
/*
userManager.addUser(u1, (err, res)=> {
  if(!err)
    console.log('success');
});
userManager.addUser(u2, (err, res)=> {
  if(!err)
    console.log('success');
});
userManager.addUser(u3, (err, res)=> {
  if(!err)
    console.log('success');
});
userManager.addUser(u4, (err, res)=> {
  if(!err)
    console.log('success');
});
userManager.addUser(u5, (err, res)=> {
  if(!err)
    console.log('success');
});
userManager.addUser(u6, (err, res)=> {
  if(!err)
    console.log('success');
});
userManager.addUser(u7, (err, res)=> {
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
userManager.checkRedeemed(u2._id, 'o2', (flag) => {
  if(flag)
    console.log('were good1');
  else {
    console.log('ffs1');
  }
});
userManager.checkRedeemed(u2._id, 'test', (flag) => {
  if(flag)
    console.log('ffs2');
  else {
    console.log('were good2');
  }
})
