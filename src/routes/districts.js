const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/getAll", async (req, res) => {
  try {
    const district = await db;
    const [districts] = await district.query("SELECT * FROM districts");
    res.json({ message: "Success", districts });
  } catch (error) {
    console.error("❌ Error fetching districts:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/getOne/:provinceId", async (req, res) => {
  try {
    const provinceId = req.params.provinceId;
    const district = await db;
    const [districts] = await district.query(
      "SELECT * FROM districts WHERE provinceId = ?",
      {
        replacements: [provinceId],
      }
    );
    res.json({ message: "Success", districts });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
