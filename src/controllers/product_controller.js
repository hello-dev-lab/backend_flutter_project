const defineProductModel = require("../models/product_model");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

exports.create = async (req, res) => {
  try {
    const Product = await defineProductModel();
    const {
      name,
      image_url,
      price,
      original_price,
      description,
      category,
      createBy,
      updateBy
    } = req.body;

     console.log(createBy, updateBy);
    // Get admin ID from token (assumes middleware sets req.user)
    // const adminId = req.user?.firstName || "admin"; // Fallback if not using token-based auth

    // Validate required fields
    if (!name || !image_url || !price || !original_price || !description || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create product
    const newProduct = await Product.create({
      name,
      image_url,
      price,
      original_price,
      description,
      category,
      createBy,
      updateBy
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });

  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getAll = async (req, res) => {
  try {
    const Product = await defineProductModel();
    const products = await Product.findAll();
    res.status(200).json({ message: "Success", products });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const Product = await defineProductModel();
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Success", product });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const Product = await defineProductModel();
    const { id } = req.params;
    const { name, image_url, price, original_price, description, category, updateBy } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.update({
      name,
      image_url,
      price,
      original_price,
      description,
      category,
      updateBy: updateBy || "admin",
    });

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const Product = await defineProductModel();
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    let images = [];

    try {
      images = JSON.parse(product.image_url);
    } catch {
      if (typeof product.image_url === "string") {
        images = [product.image_url];
      }
    }

    images.forEach((filename) => {
      const filePath = path.join(process.cwd(), "uploads", filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.search = async (req, res) => {
  try {
    const Product = await defineProductModel();
    const { keyword } = req.body;

    if (!keyword) return res.status(400).json({ error: "Keyword is required" });

    const products = await Product.findAll({
      where: { name: { [Op.like]: `%${keyword}%` } },
    });

    res.status(200).json({ message: "Search successful", products });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteMultiple = async (req, res) => {
  try {
    const Product = await defineProductModel();
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "No product IDs provided" });
    }

    const deleted = [];

    for (const id of ids) {
      const product = await Product.findByPk(id);
      if (!product) continue;

      let images = [];

      try {
        images = JSON.parse(product.image_url);
      } catch {
        if (typeof product.image_url === "string") {
          images = [product.image_url];
        }
      }

      images.forEach((filename) => {
        const filePath = path.join(process.cwd(), "uploads", filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });

      await product.destroy();
      deleted.push(product);
    }

    res.status(200).json({ message: "Deleted selected products", deleted });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
