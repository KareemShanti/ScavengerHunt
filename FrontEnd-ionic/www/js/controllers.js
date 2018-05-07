angular.module('starter.controllers', [])

.controller('LoginCtrl', function($http, $scope, $window, HuntsService, MQTTClient) {
    $scope.toSend= {username:'', password:''};
    $scope.err="";



    $scope.validate=function(form)
    {
      $scope.err="";

      if (form.$valid) {
        $http.post('http://10.25.159.141:1337/login.html', $scope.toSend).then(function(result) {

            if(result.data==="done"){
              MQTTClient.init();
              HuntsService.loginUser($scope.toSend.username);
              $scope.err="";
              $window.location.assign('#/tab/hunts');
            }
            else if(result.data==="error"){
                  $scope.err="Username or password incorrect! Please try again.";
                   }
               });

             }
      else {
          $scope.submitted = true;
          }

      }

      $scope.goToSignUp=function(){
        $window.location.assign('#/signUp');
      }
  })

 .controller('SignUpCtrl', function($http, $scope, $window) {
  $scope.toSend= {email:'',username:'',password:'',passwordConfirm:''}
  $scope.err="";


  $scope.signUp=function(form)
  {
    console.log("entered signUp");

    if (form.$valid) {
    $http.post('http://10.25.159.141:1337/signUp.html',$scope.toSend).then(function(result) {
        console.log("result:", result);
        if(result.data==="done"){
          $scope.err="";
          $window.location.assign('#/login');
        }
        else if(result.data==='usernameExists'){
              $scope.err="Username Already Exists";
               }
        else if(result.data==='emailExists'){
              $scope.err="Email is already in use";
              }
        else if(result.data==='passwordError'){
          $scope.err="Passwords do not match";
        }
           });
         }

      else {
             $scope.submitted = true;
             }

    }
})

.controller('LeaderboardCtrl', function($scope, $http, $ionicPopup) {
  $scope.ranks="";

  $http.post('http://10.25.159.141:1337/leaderboard.html').then(function(result) {
      console.log("result:", result);
          $scope.ranks=result.data;
  });
  $scope.$on('new_hint', (event, args) => {
    if(!HuntsService.checkHint(args)) {
      var huntName = args.huntName;
      var hint = args.hint;
      var message = huntName + ': ' + hint;
      $scope.showAlert = function() {

       var alertPopup = $ionicPopup.alert({
          title: 'New Hint Found',
          template: message
       });
     };
     $scope.showAlert();
   }
  });
  $scope.$on('redeemed', (event, args) => {
    var huntName = args.huntName;
    var points = args.points;
    var titleMsg = 'Hunt Completed: ' + huntName;
    var message = 'You have been awarded with ' + points + ' points for the completion of this hunt';
    $scope.showAlert = function() {

     var alertPopup = $ionicPopup.alert({
        title: titleMsg,
        template: message
     });
   };
   $scope.showAlert();
  });

})

.controller('HuntsCtrl', function($scope, $http, $ionicPopup, HuntsService, BLEHandler) {

  $http.post('http://10.25.159.141:1337/populateObjects').then(function(result) {
      $scope.hunts=result.data;
      console.log("hunts: ", $scope.hunts);

      $scope.hunts.forEach((row) => {
        HuntsService.addNewHint(row.objectName, '1', row.startingHint);
      });

  });
  $scope.$on('new_hint', (event, args) => {
    if(!HuntsService.checkHint(args)) {
      var huntName = args.huntName;
      var hint = args.hint;
      var message = huntName + ': ' + hint;
      $scope.showAlert = function() {

       var alertPopup = $ionicPopup.alert({
          title: 'New Hint Found',
          template: message
       });
     };
     $scope.showAlert();
   }
  });
  $scope.$on('redeemed', (event, args) => {
    var huntName = args.huntName;
    var points = args.points;
    var titleMsg = 'Hunt Completed: ' + huntName;
    var message = 'You have been awarded with ' + points + ' points for the completion of this hunt';
    $scope.showAlert = function() {

     var alertPopup = $ionicPopup.alert({
        title: titleMsg,
        template: message
     });
   };
   $scope.showAlert();
  });

})

.controller('HuntDetailCtrl', function($scope, $stateParams, $ionicPopup, HuntsService) {
  $scope.huntName = $stateParams.huntName;

  //toggle initially hidden, diabled, set to false
  $scope.showToggle=false;
  $scope.disableToggle=true;
  $scope.huntActive={};
  $scope.huntActive.bool=false;
  $scope.hunt=null;
  $scope.hints=null;

  console.log("Hunt name: ", $scope.huntName);
  var checkIfActive=HuntsService.getHuntByName($scope.huntName);

  //if the hunt is not active
  if(checkIfActive==false){
    console.log('Hunt is not active');
    $scope.showToggle=true; //show toggle
    $scope.huntActive.bool=false; //set toggle to false
    $scope.disableToggle=false; //enable

    //if toggle set to true
    $scope.toggleChange= function (){
      console.log('Toggled');
      console.log($scope.huntActive.bool);
      if($scope.huntActive.bool==true){
        console.log('Set to True');
        $scope.disableToggle=true; //disable
        HuntsService.addNewHunt($scope.huntName); //activate
        $scope.hunt =HuntsService.getHuntByName($scope.huntName);
      }
  }

  }

  //if hunt already active
  else{
    $scope.hunt=checkIfActive;
  }

  //hunt is set
  if($scope.hunt!=null){
    //get hints
    console.log("hunt scope: ",$scope.hunt);
    $scope.hints = HuntsService.getHintsByHunt($scope.hunt.huntName);
    $scope.hints.sort((a, b) => {return parseInt(a.stage) - parseInt(b.stage)});
    console.log("hints in ",$scope.hunt.huntName,": ", $scope.hints);
  }

  $scope.$on('new_hint', (event, args) => {
    if(!HuntsService.checkHint(args)) {
      var huntName = args.huntName;
      var hint = args.hint;
      var message = huntName + ': ' + hint;
      $scope.showAlert = function() {

       var alertPopup = $ionicPopup.alert({
          title: 'New Hint Found',
          template: message
       });
     };
     $scope.showAlert();
   }
  });
  $scope.$on('redeemed', (event, args) => {
    var huntName = args.huntName;
    var points = args.points;
    var titleMsg = 'Hunt Completed: ' + huntName;
    var message = 'You have been awarded with ' + points + ' points for the completion of this hunt';
    $scope.showAlert = function() {

     var alertPopup = $ionicPopup.alert({
        title: titleMsg,
        template: message
     });
   };
   $scope.showAlert();
  });

})
.controller('AccountCtrl', function($scope, $http, $ionicPopup, $window, HuntsService, MQTTClient) {

  $scope.username=HuntsService.getActiveUser();
  $scope.toSend= {username:$scope.username};

  $scope.$on('new_hint', (event, args) => {
    if(!HuntsService.checkHint(args)) {
      var huntName = args.huntName;
      var hint = args.hint;
      var message = huntName + ': ' + hint;
      $scope.showAlert = function() {

       var alertPopup = $ionicPopup.alert({
          title: 'New Hint Found',
          template: message
       });
     };
     $scope.showAlert();
   }
  });
  $scope.$on('redeemed', (event, args) => {
    var huntName = args.huntName;
    var points = args.points;
    var titleMsg = 'Hunt Completed: ' + huntName;
    var message = 'You have been awarded with ' + points + ' points for the completion of this hunt';
    $scope.showAlert = function() {

     var alertPopup = $ionicPopup.alert({
        title: titleMsg,
        template: message
     });
   };
   $scope.showAlert();
  });

  $scope.logout= function(){
    HuntsService.logoutUser();
    MQTTClient.disconnect();
    $window.location.assign('#/login');
  }

  $http.post('http://10.25.159.141:1337/getUserDetails.html', $scope.toSend).then(function(result) {
      console.log("user Details:", result.data);
          $scope.email=result.data.email;
          $scope.username=result.data.username;
          $scope.score=result.data.score;
  });
})

.controller('AccountDetailCtrl', function($scope, $http, $ionicPopup, $window, HuntsService) {
  $scope.toSend= {oldPass:'', newPass:'', confirmNewPass:''};
  $scope.err="";

  $scope.$on('new_hint', (event, args) => {
    if(!HuntsService.checkHint(args)) {
      var huntName = args.huntName;
      var hint = args.hint;
      var message = huntName + ': ' + hint;
      $scope.showAlert = function() {

       var alertPopup = $ionicPopup.alert({
          title: 'New Hint Found',
          template: message
       });
     };
     $scope.showAlert();
   }
  });
  $scope.edit=function(form)
  {
    $scope.err="";

    if (form.$valid) {
      $http.post('http://10.25.159.141:1337/editProfile.html', {old_pass:$scope.toSend.oldPass, new_pass:$scope.toSend.newPass}).then(function(result) {

          if(result.data==="done"){
            $scope.err="";

            $scope.showAlert = function() {

             var alertPopup = $ionicPopup.alert({
                title: 'Success',
                template: 'Password Changed Successfully!'
             });
           };
           $scope.showAlert();

            $window.location.assign('#/tab/account');
          }
          else if(result.data==="authErr"){
                $scope.err="Old password is incorrect! Please try again.";
                 }
             });

           }
    else {
        $scope.submitted = true;
        }

    }


});
