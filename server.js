var express = require('express');
var app = express();
var http = require ('http')
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require('uuid/v4');
var FileStore = require('session-file-store')(session);
var md5 = require('md5');
var UserFactory = require('./UserFactory.js');
var UserManager = require('./UserManager.js');
var ObjectFactory = require('./ObjectFactory.js');
var ObjectManager = require('./ObjectManager.js');


var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('port',process.env.PORT || 1337);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use (express.static (__dirname + '/public'));

var fs = require('fs');

app.use(session({
    genid: (req) => {
      return uuid() // use UUIDs for session IDs
    },
    secret: 'lookateam',
    store: new FileStore(),
    cookie: {maxAge: 360000},//1hour
    resave: false,
    saveUninitialized: true
  }));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

  var sess;
  var user;
/**
 * serveStaticFile is a function that reads the files from main directory and checks if there's an error in the requested file
 * @method serveStaticFile
 * @param {object} res - express response
 * @param {String} path - main directory path
 * @param {object} contentType - text or html
 * @param {object} responseCode - 200 shows no error / 500 shows error in server
 **/

function serveStaticFile (res, path , contentType , responseCode ) {
    if (!responseCode) responseCode = 200 ;
    fs.readFile (__dirname +'/public'+path, function (err,data) {
    if (err)
    {
        res.writeHead ( 500 , { 'Content-Tye' : 'text/plain' });
        res.end ( '500 - Internal Error' );
    }
    else
    {
        res.writeHead ( responseCode , { 'Content-Type' : contentType });
        res.end (data);
    }
    });
}
/**
 * @name get/Signup  Sign up page
 * @param {String} - GET request to home page
 * @returns {object} - returns html page to client
 **/
app.get ( '/' , function ( req , res ){
    sess = req.session;

    if(!sess.username)
    serveStaticFile( res, '/login.html', 'text/html');
    else
    serveStaticFile( res, '/viewObjects.html', 'text/html');

    //we need to make a signin
    //user = sess.user;
   // serveStaticFile(res, '/viewObjects.html','text/html')
});
/**
 * @name get/Signup  Sign up page
 * @param {String} signup - GET request to signup page
 * @returns {object} - returns html page to client
 **/
app.get ( '/Signup' , function ( req , res ){
    sess = req.session;
    res.type ('text/html' );
    serveStaticFile(res, '/signUp.html', 'text/html')}
);
/**
 * @name get/LeaderBoard  Leaderboard page
 * @param {String} Leaderboard - GET request to LeaderBoard page
 * @returns {object} - returns html page to client
 **/
app.get ( '/LeaderBoard' , function ( req , res ){
    sess= req.session;
    res.type ('text/html' );
    serveStaticFile(res, '/leaderboard.html', 'text/html')}
);
/**
 * @name get/ChangeScore  Changing Score page
 * @param {String} ChangeScore - GET request to ChangeScore page
 * @returns {object} - returns html page to client
 **/
app.get ( '/ChangeScore' , function ( req , res ){
    res.type ('text/html' );
    serveStaticFile(res, '/changeScore.html', 'text/html')}
);
/**
 * @name get/viewObjects  List of objects nearby page
 * @param {String} viewObjects - GET request to the list page
 * @returns {object} - returns html page to client
 **/
app.get ( '/viewObjects' , function ( req , res ){
    sess=req.session;
    res.type ('text/html' );
    serveStaticFile(res, '/viewObjects.html', 'text/html')}
);
app.get ( '/redeemObject' , function ( req , res ){
    sess=req.session;
    res.type ('text/html' );
    serveStaticFile(res, '/redeemObject.html', 'text/html')}
);
app.get ( '/editProfile' , function ( req , res ){
    sess=req.session;
    res.type ('text/html' );
    serveStaticFile(res, '/editProfile.html', 'text/html')}
);
app.get ( '/addObject' , function ( req , res ){
    sess = req.session;
    res.type ('text/html' );
    serveStaticFile(res, '/addObject.html', 'text/html')}
);

app.post('/addObject.html', urlencodedParser, function (req, res) {
    sess= req.session;
    console.log(req.body);
    var objectName1 = req.body.objectName;
    var points1 = req.body.objectPoints;
    var objectNFC1 = req.body.NFC;
    var nearbyBLEs1 = req.body.BLE;

    if(Object.getOwnPropertyNames(req.body).length > 0) {
        var res1 = res;
        console.log('Gonna check')
        objectManager = ObjectManager.init();
        objectManager.checkExistingObject(req.body.objectName, (flag)=>
        {
            var res2 = res1;
            if(flag)
            {
                console.log('flagged');
                //alert
                res.end("notDone");
            }
            else
            {
                console.log("flag is not found");
                var object = {
                    _id: req.body.objectID ,
                    objectName :objectName1,
                    points :points1,
                    objectNFC :objectNFC1,
                    nearbyBLEs : nearbyBLEs1,

                };
                objectManager.addObject(object, (err, res)=>
                {
                    if (err)
                        console.error(err);
                    else {
                        console.log("added object");
                        console.log('response: ' + res);
                        res2.end("done");
                    }
                });//end of adding
            }
        });//end of checking
    }

    }
);
app.post('/editProfile.html', urlencodedParser, function (req, res) {
    sess = req.session;
    if(!sess.username)
        serveStaticFile(res, '/login.html', 'text/html')
    else
    {
      var oldpass= md5(req.body.old_pass);
      var newpass= md5(req.body.new_pass);

      var userManager = UserManager.init();
      userManager.authenticateUser(sess.username, oldpass, (flag) => {
        if (flag) { //if authentication is successful
            userManager.updatePassword(sess.username, newpass, (err, doc) => {
                if(err)
                    res.header('Access-Control-Allow-Origin', '*').status(200).end("error");
                else
                    res.header('Access-Control-Allow-Origin', '*').status(200).end("done");
            });
        }
        else {
            res.header('Access-Control-Allow-Origin', '*').status(200).end("authErr")
        }
      });

    }}
);

app.post('/getUserDetails.html', urlencodedParser, function (req, res) {
    sess = req.session;
    if(!sess.username)
        serveStaticFile(res, '/login.html', 'text/html')
    else
    {
        var userManager = UserManager.init();
        userManager.getUserByUsername(req.body.username, (err, doc)=>{
            if(doc){
            res.header('Access-Control-Allow-Origin', '*').status(200).send({email:doc.email, username:doc._id, score:doc.score});
            }
        });
    
    }}
);

app.post('/getHuntDetails.html', urlencodedParser, function (req, res) {
    sess = req.session;
    if(!sess.username)
        serveStaticFile(res, '/login.html', 'text/html')
    else
    {
        var objectManager = ObjectManager.init();
        objectManager.getObjectById(req.body.huntName, (err, doc)=>{
            if(doc){
            res.header('Access-Control-Allow-Origin', '*').status(200).end(doc);
            }
        });
    
    }}
);


app.post('/header.html', urlencodedParser, function (req, res) {
    sess = req.session;
    if(!sess.username)
        res.end();
    else
    {
      res.end(sess.username+";"+sess.score);
    }
});
app.post('/logout', urlencodedParser, function (req, res) {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.end('done');
        }
    });

});

/**
 * @name post/changeScore  posting parameters and get request for changeScore page
 * @argument {object} urlencodedParser - Express Request Handler
 * @param {String} Score - paremeter to change the score
 * @returns {object} - returns html page to client
 **/
app.post('/changeScore.html', urlencodedParser, function (req, res) {
    var score = req.body.score;
    user.changeScore(score);
    res.type('text/html');
    serveStaticFile(res, '/changeScore.html', 'text/html')}
);
/**
 * @name post/login  posting parameters and get request for login page
 * @argument {object} urlencodedParser - Express Request Handler
 * @param {String} username - paremeter to get username
 * @param {String} password - parameter to get password
 * @returns {object} - returns html page to client
 **/
app.post('/login.html', urlencodedParser, function (req, res) {
  // username and pass for authentication'

  var username = req.body.username;
  var pass = req.body.password;
  var passHash = md5(req.body.password);
  var um= UserManager.init();

  um.authenticateUser(username, passHash, (flag)=>{
    if(flag){
        um.getUserByUsername(req.body.username,(err, doc)=>
        {
            sess = req.session;
            sess.email=doc.email;
            sess.username = doc._id;
            sess.score = doc.score;
        });

      res.header('Access-Control-Allow-Origin', '*').status(200).end("done");
    }
    else {
      res.header('Access-Control-Allow-Origin', '*').status(200).end("error");
    }
  });


});
/**
 * @name post/SignUp  posting parameters and get request for SignUp page
 * @argument {object} urlencodedParser - Express Request Handler
 * @param {String} username - paremeter to get username
 * @param {String} email - parameter to get email
 * @returns {object} - returns html page to client
 **/
app.post('/signUp.html', urlencodedParser, function (req, res) {
    var email = req.body.email;
    var user_name = req.body.username;
    var pass = req.body.password;
    var pass_conf=req.body.passwordConfirm;
    var passHash = md5(req.body.password);

    var um= UserManager.init();

    um.checkExistingUsername(user_name, (flag)=>{
        if(flag){
            res.header('Access-Control-Allow-Origin', '*').status(200).end('usernameExists');
        }

        else{
            um.checkExistingEmail(email, (email_flag)=>{

                    if(email_flag){
                      res.header('Access-Control-Allow-Origin', '*').status(200).end('emailExists');
                    }
                    else {
                        if(pass!=pass_conf){
                            res.header('Access-Control-Allow-Origin', '*').status(200).end('passwordError');
                        }
                        else{
                            var user= UserFactory.createUser(user_name, passHash, email, '0', []);
                            console.log("USER CREATED", user);
                            um.addUser(user, (err)=>{
                                    if(err){
                                        console.log("Error in adding:",err);
                                        res.header('Access-Control-Allow-Origin', '*').status(200).end('error');

                                        }
                                      else{
                                        res.header('Access-Control-Allow-Origin', '*').status(200).end('done');
                                        }
                        });


                        }
                    }
        });}
    });
});
/**
 * @name post/leaderboard  Send Sorted leaderboard
 * @argument {object} urlencodedParser - Express Request Handler
 * @returns {object} - returns html page to client
 **/
app.post('/leaderboard.html', urlencodedParser, function(req, res) {
    sess=req.session;
    var userManager = UserManager.init();

    userManager.getSortedLeaderBoard((leaderboard) => {
        res.header('Access-Control-Allow-Origin', '*').status(200).send(leaderboard);
    });
});

app.post('/viewObjects.html', urlencodedParser, function(req, res) {
    sess = req.session;
    var objectManager = ObjectManager.init();

    objectManager.getAllObjects((objects) => {

        res.send(objects);
    });
});
app.post('/redeemObject.html', urlencodedParser, function (req, res) {
    sess= req.session;
    var objectname= req.body.selectedName;
    var objectId= req.body.selectedObjId;
    userManager = UserManager.init();
    userManager.checkRedeemed(sess.username,objectId,(flag)=> {
            if(!flag)
            {   //CHANGE NAME TO ID
              objectManager = ObjectManager.init();
                ObjectManager.getObjectById(objectId, (err, doc)=> {
                    //MAKE POINTS FUNCTION
                    userManager = UserManager.init();
                    UserManager.redeemObject(sess.username, objectId, doc.points, (callback)=>
                    {
                        res.header('Access-Control-Allow-Origin', '*').status(200).end('redeemed');
                    }
                    );
                });
            }
            else{
                res.header('Access-Control-Allow-Origin', '*').status(200).end('alreadyRedeemed');
            }

    });

});
app.post('/populateObjects', urlencodedParser, function(req, res) {
    sess=req.session;
    var objectManager = ObjectManager.init();

    objectManager.getAllObjects((objects) => {
        res.header('Access-Control-Allow-Origin', '*').status(200).send(objects);
    });
});

app.post('/getObjectByName', urlencodedParser, function(req, res) {
    
    var objectManager = ObjectManager.init();

    objectManager.getObjectByName(req.body.objectName, (object) => {
        res.header('Access-Control-Allow-Origin', '*').status(200).send(object);
    });
});

app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  });




/**
 * @method serverError  server posting error message to client
 * @param {object} err - Error message
 * @param {object} req - GET request
 * @param {object} res - Express resoponse
 * @param {object} next - callback
 **/
//500 page for server error
app.use ( function ( err , req , res , next ){
    console.error(err.stack);
    res.type ( 'text/plain' );
    res.status ( 500 );
    res.send ( '500 - Server Error' ); });

/**
 * @method PageNotFoundError  requested path is not found in server directory
 * @param {object} req - GET request
 * @param {object} res - Express resoponse
 */
    // custom 404 page
app.use ( function ( req , res ){
    serveStaticFile(res,'/notFound.html', 'text/html');
});
/**
 * @name ServerStarting  server starting and listening to a given port
 */
app.listen (app.get( 'port' ), function (){
    console.log ("Server Started");
    });
