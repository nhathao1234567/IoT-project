const db = require("../models");
const Cambien = db.cambien;
//Bổ sung thêm ngày
const moment = require("moment");
moment.locale("vi");

// Create and Save a new Cambien
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nhietdo) {
    res.status(400).send({ message: "Nhiệt độ không thể rỗng!" });
    return;
  }

  // Tạo 1 đối tượng cảm biến
  const cambien = new Cambien({
    ngaynhan: moment().format("L"), //11/04/2023
    gionhan: moment().format("LT"), //21:07
    nhietdo: req.body.nhietdo,
    doam: req.body.doam,
    ph: req.body.ph,
    vitri: req.body.vitri,
  });

  // Save đối tượng cảm biến đó vào trong db
  cambien
    .save(cambien)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Đã có lỗi xảy ra khi lưu dữ liệu vào bảng Cambien",
      });
    });
};

//Retrieve all Cảm biến/ find by receive day from the database
exports.findAll = (req, res) => {
  const ngaynhan = req.query.ngaynhan;
  var condition = ngaynhan
    ? { ngaynhan: { $regex: new RegExp(ngaynhan), $options: "i" } }
    : {};

  Cambien.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Có lỗi trong khi tìm ngày nhận",
      });
    });
};
//Retrieve a single object
//Find a single CamBien with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cambien.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found CamBien with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving CamBien with id=" + id });
    });
};

//Update an object
//Update a CamBien identified by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Cambien.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update CamBien with id=${id}. Maybe CamBien was not found!`,
        });
      } else res.send({ message: "CamBien was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating CamBien with id=" + id,
      });
    });
};

//Delete an object
//Delete a Cambien with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Cambien.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Cambien with id=${id}. Maybe Cambien was not found!`,
        });
      } else {
        res.send({
          message: "Cambien was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Cambien with id=" + id,
      });
    });
};

//Delete all objects
//Delete all Cambien from the database
exports.deleteAll = (req, res) => {
  Cambien.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Cambien were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cambien.",
      });
    });
};
