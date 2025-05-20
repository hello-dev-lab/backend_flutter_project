const categoryModelPromise = require("../models/category_model");
const { Op } = require("sequelize");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    const Category = await categoryModelPromise;
    const newCategory = await Category.create({ categoryName: name });
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const Category = await categoryModelPromise;
    const categories = await Category.findAll();
    res.status(200).json({
      message: "Categories retrieved successfully",
      categories: categories,
    });
  } catch (error) {
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

    res
      .status(200)
      .json({ message: "Category retrieved successfully", category: category });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updated = async (req, res) => {
  try {
    const Category = await categoryModelPromise;
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.categoryName = name;
    await category.save();
    res
      .status(200)
      .json({ message: "Category updated successfully", category: category });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.delete = async (req, res) => {
  try{
    const Category = await categoryModelPromise;
    const {id} = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

exports.search = async (req, res) => {
  try {
    const Category = await categoryModelPromise;
    const { keyword} = req.body;

    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required for search" });
    }

    const categories = await Category.findAll({
      where: {
        categoryName: {
          [Op.like]: `%${keyword}%`,
        }
      }
    });
    res.status(200).json({
      message: "Categories retrieved successfully",
      categories: categories,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
