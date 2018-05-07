var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('data', (msg)=>{
  console.log(msg)
});

var bleHandler = require('./BLEHandler').init(eventEmitter);
bleHandler.startScan();
