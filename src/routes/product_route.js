const ProdcutController = require("../controllers/product_controller");
const express = require("express");
const router = express.Router();

module.exports = (app) => {
    app.post("/product", ProdcutController.create)
    app.get("/getAll", ProdcutController.getAll)
    app.get("/getOne/:id", ProdcutController.getOne)
    app.put("/update/:id", ProdcutController.update)
    app.delete("/delete/:id", ProdcutController.delete)
    app.post("/search", ProdcutController.search)
}