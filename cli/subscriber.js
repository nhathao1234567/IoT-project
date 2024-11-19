const mqtt = require("mqtt");
// kết nối đến một MQTT broker, lắng nghe các thông điệp từ một topic và thực hiện xử lý các sự kiện
var mqttClient; // connect to broker

// Change this to point to your MQTT broker or DNS name
const mqttHost = "192.168.91.108";
const protocol = "mqtt";
const port = "1883";

function connectToBroker() {
  const clientId = "client" + Math.random().toString(36).substring(7); //một chuỗi ngẫu nhiên được tạo để định danh cho client. Mỗi client cần có một ID duy nhất khi kết nối đến broker.

  // Change this to point to your MQTT broker
  const hostURL = `${protocol}://${mqttHost}:${port}`;

  const options = {
    keepalive: 60, //  Client sẽ gửi tín hiệu kiểm tra mỗi 60 giây để đảm bảo kết nối với broker vẫn hoạt động.
    clientId: clientId, //ID duy nhất cho client.
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true, //Yêu cầu broker không giữ trạng thái kết nối cũ khi client kết nối lại.
    reconnectPeriod: 1000, //Thời gian thử lại kết nối nếu bị mất (1 giây).
    connectTimeout: 30 * 1000, //Thời gian chờ tối đa để thiết lập kết nối là 30 giây.
  };

  mqttClient = mqtt.connect(hostURL, options); //khởi tạo kết nối MQTT client với broker theo các thông số được cung cấp

  mqttClient.on("error", (err) => {
    console.log("Error: ", err);
    mqttClient.end();
  });
///Sự kiện "error" sẽ được kích hoạt khi có lỗi xảy ra trong quá trình kết nối. Khi đó, client sẽ tự động ngắt kết nối bằng mqttClient.end().
  mqttClient.on("reconnect", () => {
    console.log("Reconnecting...");
  });
//Sự kiện "reconnect" xảy ra khi client cố gắng kết nối lại với broker sau khi bị mất kết nối.
  mqttClient.on("connect", () => {
    console.log("Client connected:" + clientId);
  });
//Sự kiện "connect" được kích hoạt khi client kết nối thành công với broker, in ra thông báo chứa clientId.
  // Received Message
  mqttClient.on("message", (topic, message, packet) => {
    console.log(
      "Received Message: " + message.toString() + "\nOn topic: " + topic
    );
  });
}
//Sự kiện "message" được kích hoạt khi client nhận được một thông điệp từ broker. Nó in ra thông báo nhận được từ một topic cụ thể.
function subscribeToTopic(topic) {
  console.log(`Subscribing to Topic: ${topic}`);

  mqttClient.subscribe(topic, { qos: 0 });
}
//Hàm này dùng để đăng ký lắng nghe một topic cụ thể. Ví dụ, trong đoạn mã này là "temperature".
//qos: 0: Mức QoS (Quality of Service) được sử dụng, mức 0 nghĩa là nhận tin nhắn theo kiểu "at most once" (ít nhất một lần, không đảm bảo tin nhắn được nhận lại nếu mất kết nối).

connectToBroker();
subscribeToTopic("temperature");
//Gọi hàm connectToBroker để khởi tạo kết nối đến broker và hàm subscribeToTopic để lắng nghe topic "temperature"