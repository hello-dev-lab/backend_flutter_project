const defineProductModel = require("../models/product_model");
const { Op } = require("sequelize");

(async () => {
  await defineProductModel();
})();
exports.create = async (req, res) => {
  try {
    const Product = await defineProductModel(); // ✅ call the function
    const {
      name,
      image_url,
      price,
      original_price,
      description,
      category_id,
    } = req.body;

    // ✅ check fields
    if (
      !name ||
      !image_url ||
      !price ||
      !original_price ||
      !description ||
      !category_id
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ create product
    const newProduct = await Product.create({
      name,
      image_url,
      price,
      original_price,
      description,
      category_id,
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
    res.status(200).json({
      message: "Products retrieved successfully",
      products: products,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}


exports.getOne = async (req, res) => {
  try{
    const Product = await defineProductModel();
    const products = await Product.findByPk(req.params.id);
    if (!products) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({
      message: "Product retrieved successfully",
      products: products,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

exports.update = async (req, res) => {
  try{
    const Product = await defineProductModel();
    const {id} = req.params;
    const {
      name,
      image_url,
      price,
      original_price,
      description,
      category_id,
    } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    product.name = name;
    product.image_url = image_url;
    product.price = price;
    product.original_price = original_price;
    product.description = description;
    product.category_id = category_id;
    await product.save();
    res.status(200).json({
      message: "Product updated successfully",
      product: product,
    });
    
  }catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}


exports.delete = async (req, res) => {
  try{
     const Product = await defineProductModel();
     const {id} = req.params;
     const product = await Product.findByPk(id);
     if (!product) {
      return res.status(404).json({ error: "Product not found" });
     }
     await product.destroy();
     res.status(200).json({
      message: "Product deleted successfully",
      product: product,
     });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

exports.search = async (req, res) => {
  try {
    const Product = await defineProductModel();
    const { keyword} = req.body;
    if(!keyword) {
      return res.status(400).json({ error: "Keyword is required for search" });
    }
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${keyword}%`
        }
      }
    });
    res.status(200).json({
      message: "Products retrieved successfully",
      products: products,
    });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }