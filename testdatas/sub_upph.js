const mqtt = require('mqtt');
const axios = require('axios');

// Cấu hình MQTT Broker và API
const raspberryBroker = 'mqtt://192.168.91.110'; // IP của Raspberry Pi
const nhietdoTopic = 'esp1/nhietdo';
const doamTopic = 'esp1/doam';
const phTopic = 'esp1/pH';
const apiUrl = 'http://localhost:8282/api/cambien'; // URL API

// Kết nối đến broker MQTT của Raspberry Pi
const laptopClient = mqtt.connect(raspberryBroker);

// Biến tạm để lưu dữ liệu từ các topic
let sensorData = {
  nhietdo: null,
  doam: null,
  ph: null,
};

laptopClient.on('connect', () => {
  console.log('Kết nối thành công với Raspberry Pi Broker');
  laptopClient.subscribe([nhietdoTopic, doamTopic, phTopic], (err) => {
    if (!err) {
      console.log(`Đã subscribe vào các topic: ${nhietdoTopic}, ${doamTopic}, ${phTopic}`);
    } else {
      console.error('Lỗi khi subscribe:', err);
    }
  });
});

laptopClient.on('message', (topic, message) => {
  const value = parseFloat(message.toString()); // Chuyển message từ Buffer sang float

  // Gán giá trị vào đúng trường
  if (topic === nhietdoTopic) {
    sensorData.nhietdo = value;
  } else if (topic === doamTopic) {
    sensorData.doam = value;
  } else if (topic === phTopic) {
    sensorData.ph = value;
  }

  // Kiểm tra nếu đã nhận đủ dữ liệu
  if (sensorData.nhietdo !== null && sensorData.doam !== null && sensorData.ph !== null) {
    console.log('Dữ liệu đầy đủ:', sensorData);

    // Chuẩn bị payload gửi lên API
    const payload = {
      ngaynhan: new Date().toLocaleDateString(), // Ngày nhận dữ liệu (định dạng Việt Nam)
      gionhan: new Date().toLocaleTimeString(),  // Giờ nhận dữ liệu
      nhietdo: sensorData.nhietdo,
      doam: sensorData.doam,
      ph: sensorData.ph,
      vitri: 'Cảm biến 1', // Vị trí cảm biến giả định
    };

    // Gửi dữ liệu lên API
    axios.post(apiUrl, payload)
      .then(response => {
        console.log('Dữ liệu đã được lưu vào database:', response.data);
      })
      .catch(error => {
        console.error('Lỗi khi gửi dữ liệu tới API:', error);
      });

    // Reset dữ liệu sau khi gửi
    sensorData = { nhietdo: null, doam: null, ph: null };
  }
});
