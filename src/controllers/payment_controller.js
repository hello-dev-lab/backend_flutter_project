const initPayment = require('../models/payment_model');

exports.create = async (req, res) => {
  try {
    const Payment = await initPayment();
    const payment = await Payment.create(req.body);
    res.status(201).json({ message: "Payment created", data: payment });
  } catch (err) {
    res.status(500).json({ message: "Failed to create payment", error: err.message });
  }
};


exports.getAll = async (req, res) => {
  try {
    const Payment = await initPayment();
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch payments", error: err.message });
  }
};


exports.getOne = async (req, res) => {
  try {
    const Payment = await initPayment();
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch payment", error: err.message });
  }
};


exports.update = async (req, res) => {
  try {
    const Payment = await initPayment();
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    await payment.update(req.body);
    res.status(200).json({ message: "Payment updated", data: payment });
  } catch (err) {
    res.status(500).json({ message: "Failed to update payment", error: err.message });
  }
};


exports.delete = async (req, res) => {
  try {
    const Payment = await initPayment();
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    await payment.destroy();
    res.status(200).json({ message: "Payment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete payment", error: err.message });
  }
};