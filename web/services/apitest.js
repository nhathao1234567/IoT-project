module.exports = (express) => {
  var router = express.Router();
  // Parse URL-encoded bodies (as sent by HTML forms)
  router.use(express.urlencoded({ extended: true }));
  // Parse JSON bodies (as sent by API clients)
  router.use(express.json());
  // Router Middleware
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  // API ROOT - Display Available Routes
  router.get("/", (req, res) => {
    res.jsonp({
      name: "IoTs API",
      version: "1.0",
    });
  });

  router.get("/getdb", async (req, res) => {
    res.jsonp({
      value: "Hàm lấy thông tin DB",
    });
  });

  //Thêm
  let list = [
    { masv: "1", hoten: "Trần Văn A", ngaysinh: "03/02/1986" },
    { masv: "2", hoten: "Trần Văn B", ngaysinh: "04/04/1999" },
  ];

  router.post("/them", (req, res) => {
    let hoten, ngaysinh, masv;
    masv = req.body.masv;
    hoten = req.body.hoten;
    ngaysinh = req.body.ngaysinh;
    value = {
      masv: masv,
      hoten: hoten,
      ngaysinh: ngaysinh,
    };

    list.push(value);

    res.jsonp({
      hoten: hoten,
      ngaysinh: ngaysinh,
      list: list,
    });
  });

  router.post("/capnhat", async (req, res) => {
    let masv;
    masv = req.body.masv;
    hoten = req.body.hoten;
    ngaysinh = req.body.ngaysinh;
    value = {
      masv: masv,
      hoten: hoten,
      ngaysinh: ngaysinh,
    };

    i = 0;
    for (var item in list) {
      //console.log(list[item]['hoten']);
      //console.log("Masv=" + list[item]['masv']);
      //console.log("Masv1=" + list[item]['masv']);
      if (list[item]["masv"] == masv) {
        list.splice(i, 1, value);
        break;
      }
      i++;
    }

    //list.push(value);
    res.jsonp({
      list: list,
      message: "Cập nhật thành công",
    });
  });


  router.post("/xoa", async (req, res) => {
    let masv;
    masv = req.body.masv;
    i = 0;
    for (var item in list) {      
      if (list[item]["masv"] == masv) {
        list.splice(i, 1);
        break;
      }
      i++;
    }

    //list.push(value);
    res.jsonp({
      list: list,
      message: "Xóa thành công",
    });
  });

  return router;
};
