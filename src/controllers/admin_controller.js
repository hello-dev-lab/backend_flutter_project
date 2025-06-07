const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin_model"); // Use directly, no need to call it as a function
const { Op } = require("sequelize");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

exports.registerAdmin = async (req, res) => {
  try {
    const Admin = await AdminModel;
    const { email, password, firstName, lastName } = req.body;

    // Check for existing admin by email or firstName
    const existingAdmin = await Admin.findOne({
      where: {
        [Op.or]: [
          { email: email },
          { firstName: firstName }
        ]
      }
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: existingAdmin.email === email
          ? "Email is already registered"
          : "First name is already taken"
      });
    }

    // Hash password and create new admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: newAdmin.id,
        email: newAdmin.email,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
      },
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.login = async (req, res) => {
      
  try {
    const Admin = await AdminModel;
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token, admin });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error });
  }
};


exports.getAllAdmins = async (req, res) => {
  try {
    const Admin = await AdminPromise;
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Failed to get admins", error });
  }
};



exports.getAdminById = async (req, res) => {
  try {
    const Admin = await AdminPromise;
    const admin = await Admin.findByPk(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Failed to get admin", error });
  }
};



exports.updateAdmin = async (req, res) => {
  try {
    const Admin = await AdminPromise;
    const { id } = req.params;
    const { email, password, firstName, lastName } = req.body;

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    let hashedPassword = admin.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await admin.update({ email, password: hashedPassword, firstName, lastName });
    res.json({ message: "Admin updated successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};



exports.deleteAdmin = async (req, res) => {
  try {
    const Admin = await AdminPromise;
    const { id } = req.params;

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    await admin.destroy();
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};


