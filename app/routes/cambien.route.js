module.exports = app => {
    const cambien = require("../controllers/cambien.controller.js");
  
    var router = require("express").Router();
  
    // Tạo mới một đối tượng cảm biến
    router.post("/", cambien.create);
  
    // Retrieve all Cambien
    router.get("/", cambien.findAll);
  
    // Retrieve a single Cambien with id
    router.get("/:id", cambien.findOne);
  
    // Update a Cambien with id
    router.put("/:id", cambien.update);
  
    // Delete a Cambien with id
    router.delete("/:id", cambien.delete);
  
    // Delete all Cảm biến
    router.delete("/", cambien.deleteAll);
  
    app.use('/api/cambien', router);
  };