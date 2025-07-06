
const orderDetailController = require('../controllers/orderDetail_controller');

module.exports = (app) => {
  app.post('/orderDetail', orderDetailController.create);
  app.get('/orderDetail/getAll', orderDetailController.getAll);
  app.get('/orderDetail/:id', orderDetailController.getOne);
  app.put('/orderDetail/update/:id', orderDetailController.update);
  app.delete('/orderDetail/delete/:id', orderDetailController.delete);
};