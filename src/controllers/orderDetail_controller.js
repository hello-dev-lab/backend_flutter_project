const defineOrderDetailModel = require("../models/orderDetail_model");
const defineProductModel = require("../models/product_model");

exports.create = async (req, res) => {
  try {
    const OrderDetail = await defineOrderDetailModel();
    const { order_id, product_id, quantity, price } = req.body;

    const newDetail = await OrderDetail.create({ order_id, product_id, quantity, price });

    res.status(201).json({ message: "Order detail created", data: newDetail });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order detail", error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const OrderDetail = await defineOrderDetailModel();
    const details = await OrderDetail.findAll();

    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order details", error: error.message });
  }
};

exports.getOrderDetailsWithProduct = async (req, res) => {
  try {
    const OrderDetail = await defineOrderDetailModel();
    const Product = await defineProductModel();


    OrderDetail.belongsTo(Product, { foreignKey: "product_id" });

    const orderId = req.params.orderId; // e.g., /order/detail/17

    const details = await OrderDetail.findAll({
      where: { order_id: orderId },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "image_url", "description"],
        },
      ],
    });

    res.status(200).json({ orderDetails: details });
  } catch (error) {
    console.error("Fetch order details with product error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const OrderDetail = await defineOrderDetailModel();
    const id = req.params.id;

    const detail = await OrderDetail.findByPk(id);

    if (!detail) {
      return res.status(404).json({ message: "Order detail not found" });
    }

    res.status(200).json(detail);
  } catch (error) {
    res.status(500).json({ message: "Failed to get order detail", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const OrderDetail = await defineOrderDetailModel();
    const id = req.params.id;
    const { order_id, product_id, quantity, price } = req.body;

    const detail = await OrderDetail.findByPk(id);

    if (!detail) {
      return res.status(404).json({ message: "Order detail not found" });
    }

    await detail.update({ order_id, product_id, quantity, price });

    res.status(200).json({ message: "Order detail updated", data: detail });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order detail", error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const OrderDetail = await defineOrderDetailModel();
    const id = req.params.id;

    const detail = await OrderDetail.findByPk(id);

    if (!detail) {
      return res.status(404).json({ message: "Order detail not found" });
    }

    await detail.destroy();

    res.status(200).json({ message: "Order detail deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order detail", error: error.message });
  }
};
