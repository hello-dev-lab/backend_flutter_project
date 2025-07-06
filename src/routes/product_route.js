const ProdcutController = require("../controllers/product_controller");
const auth = require("../middleware/authorize");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/update_image");

module.exports = (app) => {
    app.post("/product",auth, ProdcutController.create)
    app.get("/product/getAll", ProdcutController.getAll)
    app.get("/getOne/:id", ProdcutController.getOne)
    app.put("/update/:id",auth, upload.single("file"), ProdcutController.update)
    app.delete("/delete/:id", ProdcutController.delete)
    app.post("/search", ProdcutController.search)
    app.post("/product/deleteMultiple", ProdcutController.deleteMultiple)
}