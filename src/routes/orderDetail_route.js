
const orderDetailController = require('../controllers/orderDetail_controller');
const userAuth = require('../middleware/userAuth');

module.exports = (app) => {
  app.post('/orderDetail', orderDetailController.create);
  app.get('/orderDetail/getAll', orderDetailController.getAll);
  app.get('/orderDetail/:id', orderDetailController.getOne);
  app.put('/orderDetail/update/:id', orderDetailController.update);
  app.delete('/orderDetail/delete/:id', orderDetailController.delete);
  app.get('/orderDetail/getOrder/:orderId', orderDetailController.getOrderDetailsWithProduct);
};