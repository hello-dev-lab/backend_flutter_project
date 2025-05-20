const categoryController = require("../controllers/category_controller");
const express = require("express");
const router = express.Router();
const auth = require("../middleware");

module.exports = (app) => {
  app.post("/category", categoryController.create);
  app.get("/category/getAll", categoryController.getAll);
  app.get("/category/getOne/:id", categoryController.getOne);
  app.put("/category/update/:id", categoryController.updated);
  app.delete("/category/delete/:id", categoryController.delete);
  app.post("/category/search", categoryController.search);
};
