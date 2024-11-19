const mqtt = require('mqtt'); 
const laptopClient = mqtt.connect('mqtt://192.168.91.105'); // Địa chỉ IP của laptop

laptopClient.on('connect', () => {
  console.log('Kết nối thành công với Laptop Broker');
  // topic can nhan du lieu
  laptopClient.subscribe('laptop/nhietdo', (err) => {
    if (err) {
      console.error('Lỗi khi subscribe:', err);
    } else {
      console.log('Đã subscribe vào laptop/nhietdo');
    }
  });
});

laptopClient.on('message', (topic, message) => {
  console.log(`Dữ liệu nhận từ Raspberry Pi: ${message.toString()}`);
});
