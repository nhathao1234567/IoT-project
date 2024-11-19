const express = require("express");
const app = express();

app.locals.baseURL = "http://localhost:4000"
//setting view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));


//route for index page
app.get("/", (req, res) => {
  res.render("index", {title:"Trang thống kê"});
});

//route for magic page
app.get("/tk", (req, res) => {
  res.render("thongke", {title:"Trang thống kê"});
});

app.get("/pl", (req, res) =>  {
  res.render("days", {title:"Biểu Đồ Days"});
});

app.get("/month", (req, res) =>  {
  res.render("month", {title:"Biểu Đồ Month"});
});

app.get("/year", (req, res) =>  {
  res.render("year", {title:"Biểu Đồ Year"});
});

app.get("/hour", (req, res) =>  {
  res.render("hour", {title:"Biểu Đồ Hour"});
});

app.listen(4000, () => {
  console.log("Server is running on port 4000 ");
});



// API
var apiRouterAPITest = require('./services/apitest')(express);
app.use('/api/test', apiRouterAPITest);
//Đối tượng Sinh Viên
var apiRouterAPISV = require('./services/sinhvien')(express);
app.use('/api/sinhvien', apiRouterAPISV);

