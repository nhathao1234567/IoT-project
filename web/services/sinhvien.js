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

  //Viết hàm thêm
  let listSinhVien = [
    { masv: 1, hoten: "Nguyễn Thị Lan", ngaysinh: "12/04/2003" },
    { masv: 2, hoten: "Trần Văn Súng", ngaysinh: "10/03/2004" },
  ];
  router.post("/them", (req, res) => {
    let hoten, ngaysinh, masv;
    masv = req.body.masv;
    hoten = req.body.hoten;
    ngaysinh = req.body.ngaysinh;
    let sinhvien = {
      masv: masv,
      hoten: hoten,
      ngaysinh: ngaysinh,
    };
    listSinhVien.push(sinhvien);
    res.jsonp({
      dssv: listSinhVien,
      message: "Thêm thành công",
    });
  });

  router.post("/capnhat", (req, res) => {
    let hoten, ngaysinh, masv;     
    masv = req.body.masv;
    hoten = req.body.hoten;
    ngaysinh = req.body.ngaysinh;
    let sinhvien = {
      masv: masv,
      hoten: hoten,
      ngaysinh: ngaysinh,
    };
    let i =0;
    for(let item in listSinhVien)
    {
       if(listSinhVien[item]['masv'] == masv)
       {
            listSinhVien.splice(i, 1, sinhvien);
            break;
       } 
       i++;
    }

    res.jsonp({
        dssv: listSinhVien,
        message: "Cập nhật thành công",
      });

  });


  return router;
};
