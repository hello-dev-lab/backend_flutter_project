const categoryController = require("../controllers/category_controller");
const auth = require("../middleware/authorize");
const upload = require("../middleware/update_image");

module.exports = (app) => {
  app.post("/category", auth, categoryController.create);
  app.get("/category/getAll", categoryController.getAll);
  app.get("/category/getOne/:id", categoryController.getOne);
  app.put("/category/update/:id", auth, upload.single("file"), categoryController.updated);
  app.delete("/category/delete/:id", categoryController.delete);
  app.post("/category/search", categoryController.search);
};
