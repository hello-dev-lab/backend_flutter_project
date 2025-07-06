
const paymentController = require("../controllers/payment_controller");

module.exports = (app) => {

  app.post("/payment", paymentController.create);

  app.get("/payment/getAll", paymentController.getAll);

  app.get("/payment/:id", paymentController.getOne);

  app.put("/payment/:id", paymentController.update);

  app.delete("/payment/delete/:id", paymentController.delete);
}
