const orderController = require("../controllers/order_controller");
const userAuth = require("../middleware/userAuth");
const authorize = require("../middleware/authorize");

module.exports = (app) => {
  app.post("/order", userAuth, orderController.create);
  app.get("/order/getAll", orderController.getAll);
  app.get("/order/:id", userAuth, orderController.getOne);
  app.put("/order/:id/status", authorize, orderController.updateOrderStatus);
  app.delete("/order/delete/:id", orderController.delete);
  app.get("/my-orders", userAuth, orderController.getAllUserOrders);

};