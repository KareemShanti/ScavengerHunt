var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.mqttdashboard.com');

var hintManager = require('./HintManager.js').init({});

function intervalCallback(objects) {
  objects.forEach((row) => {
    var path = Object.keys(row)[0];
    var hint = row[path];
    client.publish(path, hint);
  });
}
hintManager.getMQTTList((hints) => {
  console.log(hints);
  setInterval(intervalCallback.bind(null, hints), 5000);
});
