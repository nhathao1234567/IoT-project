const mqtt = require('mqtt');
const axios = require('axios');

// Cấu hình MQTT Broker
const raspberryBroker = 'mqtt://192.xx.xx.xx';  // IP của Raspberry Pi
const espTopic = 'esp/soil';  // Topic MQTT mà Raspberry Pi đang gửi dữ liệu
const apiUrl = 'http://localhost:8282/api/cambien';  // URL API để lưu vào cơ sở dữ liệu

// Kết nối đến broker MQTT của Raspberry Pi
const laptopClient = mqtt.connect(raspberryBroker);

laptopClient.on('connect', () => {
  console.log('Kết nối thành công với Raspberry Pi Broker');
  laptopClient.subscribe(espTopic, (err) => {
    if (!err) {
      console.log(`Đã subscribe vào topic: ${espTopic}`);
    } else {
      console.error('Lỗi khi subscribe:', err);
    }
  });
});

// Nhận dữ liệu từ Raspberry Pi qua MQTT và gửi đến API
laptopClient.on('message', (topic, message) => {
  if (topic === espTopic) {
    const data = message.toString(); 
     // Chuyển dữ liệu từ Buffer sang chuỗi
    console.log(`Dữ liệu nhận từ Raspberry Pi: ${data}`);

    // Tạo payload gửi lên API (dữ liệu mẫu, bạn có thể tùy chỉnh theo nhu cầu)
    const payload = {
      ngaynhan: new Date().toLocaleDateString(),  // Ngày nhận dữ liệu
      gionhan: new Date().toLocaleTimeString(),  // Giờ nhận dữ liệu
      nhietdo: 27,  
      doam: data || 0,  // Nếu không có data, gán giá trị là 0
      ph: 7,       
      vitri: 'Cảm biến 1'  // Vị trí cảm biến giả sử
    };

    // Gửi dữ liệu lên API
    axios.post(apiUrl, payload)
      .then(response => {
        console.log('Dữ liệu đã được lưu vào database:', response.data);
      })
      .catch(error => {
        console.error('Lỗi khi gửi dữ liệu tới API:', error);
      });
  }
});
