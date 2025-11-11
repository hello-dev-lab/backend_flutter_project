const categoryModelPromise = require("../models/category_model");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Create
exports.create = async (req, res) => {
  try {
    const Category = await categoryModelPromise;
    const { categoryName, image_url, createBy, updateBy } = req.body;

    if (!categoryName || !image_url || !createBy) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newCategory = await Category.create({
      categoryName,
      image_url,
      createBy,
      updateBy
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all
exports.getAll = async (req, res) => {
  try {
    const Category = await categoryModelPromise;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const { count, rows } = await Category.findAndCountAll({
      offset: skip,
      limit: limit,
    });

    res.status(200).json({
      message: "Categories retrieved successfully",
      skip,
      limit,
      count, 
      categories: rows, // only up to 10 per request
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getOne = async (req, res) => {
  try {
    const Category = await categoryModelPromise;
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({
      message: "Category retrieved successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update
exports.updated = async (req, res) => {
  try {
    const Category = await categoryModelPromise;
    const { id } = req.params;
    const { name, updateBy } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.categoryName = name;

    if (req.file) {
      if (category.image_url) {
        const oldImagePath = path.join(process.cwd(), "uploads", category.image_url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      category.image_url = req.file.filename; 
    }

    if (updateBy !== undefined) {
      category.updateBy = updateBy;
    }

    await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Delete
exports.delete = async (req, res) => {
  try {
    const Category = await categoryModelPromise;
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    let image = [];

    try {
      image = JSON.parse(category.image_url);
    } catch {
      if (typeof category.image_url === "string") {
        image = [category.image_url];
      }
    }

    image.forEach((filename) => {
      const filePath = path.join(process.cwd(), "uploads", filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted image: ${filename}`);
      } else {
        console.warn(`Image file not found: ${filename}`);
      }
    });

    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Search
exports.search = async (req, res) => {
  try {
    const Category = await categoryModelPromise;
    const { keyword } = req.body;

    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required for search" });
    }

    const categories = await Category.findAll({
      where: {
        categoryName: {
          [Op.like]: `%${keyword}%`,
        },
      },
    });

    res.status(200).json({
      message: "Categories retrieved successfully",
      categories,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
