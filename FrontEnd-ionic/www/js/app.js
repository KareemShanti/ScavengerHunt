// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var myApp=angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

myApp.config(function($ionicConfigProvider){
  $ionicConfigProvider.tabs.position("bottom");
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
  url: '/login',
  templateUrl: 'templates/login.html',
  controller: 'LoginCtrl'
  })

    .state('signUp', {
    url: '/signUp',
    templateUrl: 'templates/signUp.html',
    controller: 'SignUpCtrl'
    })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.leaderboard', {
    url: '/leaderboard',
    views: {
      'tab-leaderboard': {
        templateUrl: 'templates/tab-leaderboard.html',
        controller: 'LeaderboardCtrl'
      }
    }
  })

  .state('tab.hunts', {
      url: '/hunts',
      views: {
        'tab-hunts': {
          templateUrl: 'templates/tab-hunts.html',
          controller: 'HuntsCtrl'
        }
      }
    })
    .state('tab.hunt-detail', {
      url: '/hunts/:huntName',
      views: {
        'tab-hunts': {
          templateUrl: 'templates/hunt-detail.html',
          controller: 'HuntDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

//can edit password from account tab
  .state('tab.account-detail', {
    url: '/account/:userName',
    views: {
      'tab-account': {
        templateUrl: 'templates/account-detail.html',
        controller: 'AccountDetailCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
