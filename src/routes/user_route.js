const userController = require("../controllers/user_controller");
const auth = require("../middleware");

module.exports = (app) => {
  app.get("/user/verifyToken", userController.verifyToken);
  app.post("/user", userController.create);
  app.get("/user/getAll", userController.getAll);
  app.get("/user/:id", userController.getOne);
  app.post("/user/login", userController.login);
  app.put("/user/:id", userController.update);
  app.delete("/user/:id", userController.delete);
  app.post("/user/search", userController.search);
};
