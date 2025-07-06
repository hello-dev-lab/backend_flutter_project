const defineOrderModel = require("../models/order_model");

exports.create = async (req, res) => {
  try {
    const Order = await defineOrderModel();

    const {
      province,
      district,
      village,
      total_amount,
      order_date,
      status,
    } = req.body;


    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized: missing user ID" });
    }

    if (!province || !district || !village || !total_amount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newOrder = await Order.create({
      user_id,
      province,
      district,
      village,
      total_amount,
      order_date: order_date || new Date(),
      status: status || "pending",
    });

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getAll = async (req, res) => {
  try {
    const Order = await defineOrderModel();
    const orders = await Order.findAll();
    res.status(200).json({ message: "Success", orders });
  } catch (error) {
    console.error("Get All Orders Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const Order = await defineOrderModel();
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Success", order });
  } catch (error) {
    console.error("Get One Order Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

exports.delete = async (req, res) => {
  try {
    const Order = await defineOrderModel();
    const orderId = req.params.id;
    const deletedCount = await Order.destroy({ where: { id: orderId } });
    if (deletedCount === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete Order Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
