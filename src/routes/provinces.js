const express = require('express');
const router = express.Router();
const sequelize = require('../config/db'); 

router.get('/provinces', async (req, res) => {
  try {
    const provinces = await sequelize;
    const [results] = await provinces.query('SELECT * FROM provinces');
    res.json({ message: 'Success', results });
  } catch (error) {
    console.error("❌ Error fetching provinces:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
