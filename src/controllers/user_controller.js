const Users = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.create = async (req, res) => {
    try {
      const { email, password, userName } = req.body;
      if (!email || !password || !userName) {
        return res.status(400).send({ message: 'Email, password, and userName are required' });
      }
  
      const hashPassword = await bcrypt.hash(password, 10);
  
      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send({ message: 'Email already in use' });
      }
  
      const newUser = await Users.create({
        email,
        password: hashPassword,
        userName
      });
  
      res.status(201).send({
        message: 'User created successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          userName: newUser.userName
        }
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send({
        message: 'Failed to create user',
        error: error.message || error
      });
    }
  };
  
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await Users.findOne({where: {email: email}});
        if(!user){
            return res.status(404).send({message: 'User not found'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).send({message: 'Invalid password'});
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).send({
            message: 'Login successful',
            token: token,
        });
    } catch (error) {
        res.status(500).json({message: 'Error logging in', error: error.message});
    }
}

exports.getAll = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Error getting users', error: error.message});
    }
}

exports.getOne = async (req, res) => {
    try {
      const user = await Users.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user', error });
    }
  };

  exports.update = async (req, res) => {
    try {
      const { email, password, userName } = req.body;
      const [updated] = await Users.update(
        { email, password, userName },
        { where: { id: req.params.id } }
      );
  
      if (!updated) {
        return res.status(404).json({ message: 'User not found or no changes made' });
      }
  
      const updatedUser = await Users.findByPk(req.params.id);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user', error });
    }
  };

  exports.deleted = async (req, res) => {
    try {
      const deleted = await Users.destroy({ where: { id: req.params.id } });
  
      if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user', error });
    }
  };