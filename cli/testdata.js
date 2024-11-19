const mqtt = require('mqtt');

// Kết nối tới MQTT broker tại địa chỉ 192.168.91.103
const client = mqtt.connect('mqtt://192.168.91.103'); 

// Lắng nghe khi kết nối thành công với broker
client.on('connect', () => {
  console.log('Connected to server broker');

  // Đăng ký (subscribe) vào topic 'soil/server'
  client.subscribe('soil/server', (err) => {
    if (!err) {
      console.log('Subscribed to soil/server topic');
    } else {
      console.error('Failed to subscribe to soil/server:', err);
    }
  });
});

// Lắng nghe và xử lý dữ liệu nhận được từ broker
client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);

  // Bạn có thể thêm phần xử lý dữ liệu ở đây nếu cần
  // Ví dụ: Parse JSON từ tin nhắn nếu dữ liệu dạng JSON
  try {
    const data = JSON.parse(message.toString());
    console.log('Parsed data:', data);

    // Thêm các thao tác xử lý dữ liệu theo nhu cầu
  } catch (err) {
    console.error('Failed to parse message:', err);
  }
});

// Lắng nghe sự kiện lỗi (nếu có lỗi xảy ra trong quá trình kết nối)
client.on('error', (err) => {
  console.error('Connection error:', err);
});
