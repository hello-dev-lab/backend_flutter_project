const ProdcutController = require("../controllers/product_controller");
const auth = require("../middleware");
const express = require("express");
const router = express.Router();

module.exports = (app) => {
    app.post("/product",auth, ProdcutController.create)
    app.get("/getAll", ProdcutController.getAll)
    app.get("/getOne/:id", ProdcutController.getOne)
    app.put("/update/:id", ProdcutController.update)
    app.delete("/delete/:id", ProdcutController.delete)
    app.post("/search", ProdcutController.search)
    app.post("/product/deleteMultiple", ProdcutController.deleteMultiple)
}