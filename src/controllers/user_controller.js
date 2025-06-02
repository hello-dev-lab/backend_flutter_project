const UsersModel= require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Op } = require('sequelize');

exports.create = async (req, res) => {
  try {
    const Users = await UsersModel;
    const { email, password, userName } = req.body;

    if (!email || !password || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      email,
      password: hashedPassword,
      userName,
    });

    res.status(201).json({
      message: "User created successfully",
      token: hashedPassword,
      user: {
        id: newUser.id,
        email: newUser.email,
        userName: newUser.userName,
      },
    });

  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

  
exports.login = async (req, res) => {
  try {
    const Users = await UsersModel;

    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const User = await UsersModel;

    const allUsers = await User.findAll({
      attributes: ['id', 'email', 'userName', 'createdAt', 'updatedAt'],
    });

    res.status(200).json({
      message: 'All users retrieved successfully',
      users: allUsers,
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.search = async (req, res) => {
  try {
    const Users = await UsersModel;
    const { keyword } = req.body;

    if (!keyword) {
      return res.status(400).json({ message: 'Keyword is required for search' });
    }

    const allUsers = await Users.findAll({
      where: {
        [Op.or]: [
          { email: { [Op.like]: `%${keyword}%` } },
          { userName: { [Op.like]: `%${keyword}%` } },
        ]
      },
      attributes: ['email', 'userName'],
    });

    res.status(200).json({
      message: 'Users retrieved successfully',
      users: allUsers,
    });
  } catch (error) {
    console.error('Error retrieving users:', error.message, error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getOne = async (req, res) => {
  try {
    const Users = await UsersModel;
    const userId = req.params.id;

    const user = await Users.findByPk(userId, {
      attributes: ['id', 'email', 'userName'], // exclude password
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User retrieved successfully',
      user: user,
    });
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const Users = await UsersModel;
    const userId = req.params.id;
    const { email, password, userName } = req.body;


    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email) {
      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (userName) {
      user.userName = userName;
    }

    await user.save();

    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const Users = await UsersModel;
    const userId = req.params.id;

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    // next();
    res.status(200).json({ message: 'Token verified' });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}