const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {});
var i = 0;

app.locals.baseURL = "http://localhost:3000"
//setting view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("connected");
});

app.get("/stop", (req, res) => {    
    io.emit("SEN01", "CMD01");//Ra lệnh dừng nhận dữ liệu
    

  //["SEN01", "CMD01"]

    res.sendStatus(200);
});

app.get("/start", (req, res) => {    
  io.emit("SEN01", "CMD02");//Mở nhận dữ liệu
  
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.render("index", {title:"Trang thống kê"});
});
  
  //route for magic page
app.get("/tk", (req, res) =>  {
  res.render("thongke", {title:"Trang thống kê"});
});
  
app.get("/pl", (req, res) =>  {
  res.render("thongkeplot", {title:"Biểu Đồ Plot"});
});
app.get("/month", (req, res) =>  {
  res.render("month", {title:"Biểu Đồ month"});
});

httpServer.listen(3000);
