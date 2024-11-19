const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.91.105'); // Địa chỉ broker server

client.on('connect', () => {
  console.log('Connected to server broker');
  client.subscribe('soil/server', (err) => {
    if (!err) {
      console.log('Subscribed to soil/server topic');
    }
  });
});

client.on('message', (topic, message) => {
  console.log(`Received message on ${topic}: ${message.toString()}`);
});
