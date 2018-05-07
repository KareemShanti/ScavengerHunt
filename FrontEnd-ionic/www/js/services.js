angular.module('starter.services', [])

.service('HuntsService', function($rootScope, $http) {
  var storage = window.localStorage;
  var huntsKey = 'ActiveHunts';
  var beaconsKey = 'BLEs';
  var hintsKey = 'hints';
  var userKey = 'activeUser';

  this.writeData = (key, data) => {
    try {
      storage.setItem(key, JSON.stringify(data));
    }
    catch (err) {
      console.log('Error Writing to Storage: ' + err);
    }
  },
  this.readData = (key) => {
    try {
      var buffer = '';
      if(buffer = storage.getItem(key))
        return JSON.parse(buffer);
      else
        return null;
    }
    catch (err) {
      console.log('Error Reading from Storage: ' + err);
    }
  },
  this.loginUser = (username) => {
    var activeUser = {};
    activeUser.user = username;
    this.writeData(userKey, activeUser);
  },
  this.getActiveUser = () => {
    var user = this.readData(userKey);
    return user.user;
  },
  this.logoutUser = () => {
    var activeUser = {};
    this.writeData(userKey, activeUser);
  } ,
  this.addNewHunt = (name) => {
    try {
      var currentUser = this.getActiveUser();

      var userData = this.readData(currentUser);
      userData[huntsKey].list.push({huntName: name, stage: 1});
    }
    catch (err) {
      console.log('No Hunts Found: Creating Node');
      try{
        userData[huntsKey] = {list : []};
        userData[huntsKey].list.push({huntName: name, stage: 1});
      }
      catch (err) {
        console.log('User not Found: Creating Node');
        userData = {};
        userData[huntsKey] = {list : []};
        userData[huntsKey].list.push({huntName: name, stage: 1});
      }
    }


    this.writeData(currentUser, userData);
  },
  this.getHuntByName = (name) => {
    try {
      var currentUser = this.getActiveUser();

      var userData = this.readData(currentUser);

      for(var i in userData[huntsKey].list) {
        var buffer = userData[huntsKey].list[i];
        if(buffer.huntName == name) {
          return buffer;
        }
      }
      return false;
    }
    catch (err) {
      console.log('No user data found');
      return false;
    }
  },
  this.updateStage = (name, step) => {
    try {
      var currentUser = this.getActiveUser();

      var userData = this.readData(currentUser);

      for(var i in userData[huntsKey].list) {
        var buffer = userData[huntsKey].list[i];
        if(buffer.huntName == name) {
          buffer.stage = step;
        }
        userData[huntsKey].list[i] = buffer;
      }
      this.writeData(currentUser, userData);
    }
    catch (err) {
      console.log(err);
      return false;
    }
  },
  this.checkExistingBeacon = (ble_list, ble_id) => {
    for(var i in ble_list) {
      if(ble_list[i] == ble_id)
        return true;
    }
    return false;
  },
  this.addDiscoveredBeacon = (ble_id) => {
    var currentUser = this.getActiveUser();

    var userData = this.readData(currentUser);

    var discoveredBeacons = userData[beaconsKey];

    if(discoveredBeacons == null)
      discoveredBeacons = {list : []};

    if(this.checkExistingBeacon(discoveredBeacons.list, ble_id)) {
      console.log('Beacon Already Discovered');
      return false;
    }
    else {
      discoveredBeacons.list.push(ble_id);
    }
    userData[beaconsKey] = discoveredBeacons;

    this.writeData(currentUser, userData);
    return true;
  },
  this.clearBLEList = () => {
    var currentUser = this.getActiveUser();

    var userData = this.readData(currentUser);

    var discoveredBeacons = userData[beaconsKey];

    discoveredBeacons = {list : []};

    userData[beaconsKey] = discoveredBeacons;

    this.writeData(currentUser, userData);
  },
  this.checkHint = (hintObject) => {
    var currentUser = this.getActiveUser();

    var userData = this.readData(currentUser);

    var hints = userData[hintsKey];
    return this.checkExistingHint(hints, hintObject);
  },
  this.checkExistingHint = (hintList, hintObject) => {
    for (var i in hintList) {
      var buffer  =  hintList[i];
      if(buffer.huntName == hintObject.huntName && buffer.stage == hintObject.stage && buffer.hint == hintObject.hint)
        return true;
    }
    return false;
  },
  this.addNewHint = (name, step, newHint) => {
    try {
      var currentUser = this.getActiveUser();

      var userData = this.readData(currentUser);

      var hints = userData[hintsKey];

      if(this.checkExistingHint(hints.list, {huntName: name, stage: step, hint: newHint})) {
        console.log('Hint Already Added');
        return false;
      }
      else {
        hints.list.push({huntName: name, stage: step, hint: newHint});

        userData[hintsKey] = hints;

        this.writeData(currentUser, userData);
      }
    }
    catch (err) {
      console.log('No hints found: Creating Node');
      try {
        hints = {list : []};
        hints.list.push({huntName: name, stage: step, hint: newHint});
        userData[hintsKey] = hints;
        this.writeData(currentUser, userData);
      }
      catch (err) {
        console.log('No user found: Creating Node');
        userData = {};
        userData[hintsKey] = hints;
        this.writeData(currentUser, userData);
      }
    }
  },
  this.getHintsByHunt = (name) => {
    try {
      var currentUser = this.getActiveUser();

      var userData = this.readData(currentUser);

      var hints = userData[hintsKey];

      var matchList = [];

      for(var i in hints.list) {
        var buffer = hints.list[i];
        if(buffer.huntName == name) {
          matchList.push(buffer);
        }
      }
      return matchList;
    }
    catch (err) {
      console.log('No hints found');
      return false;
    }
  },
  this.generateMQTTPaths = () => {
    var currentUser = this.getActiveUser();

    var userData = this.readData(currentUser);

    var discoveredBeacons = userData[beaconsKey];
    var activeHunts = userData[huntsKey];

    if (activeHunts == null || discoveredBeacons == null)
      return false;

    var MQTTPaths = [];

    for (var i in activeHunts.list) {
      var buffer = activeHunts.list[i];
      buffer.stage++;
      var path = buffer.huntName + '/' + buffer.stage.toString() + '/';

      for (var j in discoveredBeacons.list) {
        path = path + discovereBeacons.list[j];
        MQTTPaths.push(path);
      }
    }
    return MQTTPaths;
  },
  this.generatePaths = (hunts_list, ble_list) => {
    var MQTTPaths = [];

    for (var i in hunts_list) {
      var buffer = hunts_list[i];
      var nextStage = buffer.stage + 1;
      var path = buffer.huntName + '/' + buffer.stage.toString() + '/';

      for (var j in ble_list) {
        path = path + ble_list[j];
        MQTTPaths.push(path);
      }
    }
    return MQTTPaths;
  },
  this.redeemObject = (name) => {
    var callback = function (result) {
        var score =  result.data.points;
        var objectID = result.data._id;
        var username = this.getActiveUser();
        $http.post('http://10.25.159.141:1337/redeemObject.html', {selectedName: name, selectedObjId: objectID}).then(function(result) {
          if(result.data == 'redeemed') {
            console.log('Redeem Successful');
            $rootScope.$broadcast('redeemed', {huntName: name, points: score});
          }
        });
    }
    $http.post('http://10.25.159.141:1337/getObjectByName', {objectName: name}).then(callback.bind(this));
  }
  $rootScope.$on('ble_discovery', (event, message) => {
    try {
      console.log(message);
      console.log('BLE Listener Called');
      var currentUser = this.getActiveUser();
      var activeHunts = this.readData(currentUser);
      activeHunts = activeHunts[huntsKey];
      var paths = [];

      for(var i in message.list) {
        var buffer = message.list[i];
        this.addDiscoveredBeacon(buffer.minor);

        for (var j in activeHunts.list) {
          var buffer1 = activeHunts.list[j];
          var nextStage = buffer1.stage + 1;
          var path = buffer1.huntName + '/' + nextStage.toString() + '/' + buffer.minor;
          paths.push(path);
        }

      }


      $rootScope.$broadcast('mqtt_update', paths);
    }
    catch (err) {
      console.log('Error In BLE Listener: ' + err);
    }
  });

})
.service('MQTTClient', function($rootScope, HuntsService){
  var messages = {m:[]}
  var wsbroker = "broker.mqttdashboard.com";  //mqtt websocket enabled broker
  var wsport = 8000 // port for above

  var client = new Paho.MQTT.Client(wsbroker, wsport,
    "myclientid_" + parseInt(Math.random() * 100, 10));

  client.onConnectionLost = function (responseObject) {
    console.log("connection lost: " + responseObject.errorMessage);
  };
  client.onMessageArrived = function (message) {
    //unsubscribe to stop receiving hints
    client.unsubscribe(message.destinationName);
    HuntsService.clearBLEList();
    console.log('Message Arrived: ' + message.payloadString);
    messages.m.push(message.destinationName, ' -- ', message.payloadString);
    var param = message.destinationName.split('/');
    //update stage to the next stage
    HuntsService.updateStage(param[0], parseInt(param[1]));
    if(message.payloadString == 'end') {
      //add hint to storage
      HuntsService.addNewHint(param[0], param[1],  'Hunt Completed');
      HuntsService.redeemObject(param[0]);
    }
    else {
      //add hint to storage
      HuntsService.addNewHint(param[0], param[1],  message.payloadString);

      $rootScope.$broadcast('new_hint',  {huntName: param[0], stage: param[1], hint: message.payloadString});
    }
  };
  var options = {
    timeout: 3,
    onSuccess: function () {
      console.log("mqtt connected");
      // Connection succeeded; subscribe to our topic, you can add multile lines of these
      var list = HuntsService.generateMQTTPaths();

      if (list) {
        for(var i in list) {
          client.subscribe(list[i], { qos: 1 });
        }
      }
    },
    onFailure: function (message) {
      console.log("Connection failed: " + message.errorMessage);
    }
  };
  $rootScope.$on('mqtt_update', (event, results) => {
    for(var i in results) {
      client.subscribe(results[i], { qos: 1 });
    }
  });
  this.init = () => {
    try {
      client.connect(options);
    }
    catch (err) {
      console.log(err);
    }
  },
  this.subscribeToMQTTList = () => {
    var list = HuntsService.generateMQTTPaths();

    if (list) {
      for(var i in list) {
        client.subscribe(list[i], { qos: 1 });
      }
    }
  },
  this.disconnect = () => {
    try {
      client.disconnect();
    }
    catch (err) {
      console.log(err);
    }
  }
})
.service('BLEHandler', function ($rootScope) {
  // All Beacons to track
  var Beacons = [
      {
          uuid        : 'b9407f30-f5f8-466e-aff9-25556b57fe6d',
          identifier  : 'sdf'
      }
  ];

  var BeaconRegions = [];

  // loop Beacons to be used.
  for (var i in Beacons) {
      var b = Beacons[i];
      BeaconRegions[b.identifier] = new cordova.plugins.locationManager.BeaconRegion(b.identifier, b.uuid, b.major, b.minor);
  }//end for

  var bluetoothPlugin = cordova.plugins.locationManager;
  var delegate = new bluetoothPlugin.Delegate();
  var initBluetooth = function() {
    try {
        // check to see if Bluetooth is ON, if not turn it ON
        bluetoothPlugin.isBluetoothEnabled()
            .then(function (isEnabled) {
                if (isEnabled) {
                  console.log("Bluetooth is enabled: " + isEnabled);
                } else {
                    bluetoothPlugin.enableBluetooth();
                }
            })
            .fail(function (e) {
              console.log('Failed to Enable Bluetooth: ' + e);
            })
            .done();
    }
    catch (err) {
      console.error("Error : " + err);
    }
  }
  initBluetooth();
  delegate.didStartMonitoringForRegion = function (result) {
    var log = ">>> START " + JSON.stringify(result)
    console.log(log)
  };

  delegate.didEnterRegion = function (result) {
    var log = ">>> ENTER " + JSON.stringify(result);
    console.log(log);
    bluetoothPlugin.startRangingBeaconsInRegion(BeaconRegions[result.region.identifier]);
  };

  delegate.didExitRegion = function (result) {
    var log = ">>> EXIT " + JSON.stringify(result);
    console.log(log);
    bluetoothPlugin.stopRangingBeaconsInRegion(BeaconRegions[result.region.identifier]);
  };

  delegate.didRangeBeaconsInRegion = function (result) {
    var log = ">>>|| RANGE DEBUG ||<<< ID: " + result.region.identifier + ' Beacons: ' + result.beacons[0].minor;
    console.log(log);

    $rootScope.$broadcast('ble_discovery', {list: result.beacons});
  };
  bluetoothPlugin.setDelegate(delegate);
  bluetoothPlugin.requestAlwaysAuthorization();

  // Loop BeaconRegions to setup region monitoring.
  for (var i in BeaconRegions) {
      var b = BeaconRegions[i];
      if (b == undefined) continue;
      bluetoothPlugin.startMonitoringForRegion(b);
  }
});
