const userController = require("../controllers/user_controller");
const auth = require("../middleware");

module.exports = (app) => {
  app.get("/user/verifyToken", auth, userController.verifyToken);
  app.post("/user", userController.create);
  app.get("/user/getAll", auth, userController.getAll);
  app.get("/user/:id", auth, userController.getOne);
  app.post("/user/login", userController.login);
  app.put("/user/:id", auth, userController.update);
  app.delete("/user/:id",auth, userController.delete);
  app.post("/user/search",auth, userController.search);
};
