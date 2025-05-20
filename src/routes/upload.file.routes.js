const route = require("express").Router();
const multer = require("multer");

var fileName;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    fileName =
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname;
    cb(null, fileName);
  },
});



const uploads = multer({ storage: storage });

route.post("/upload-single-file", uploads.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res
    .status(200)
    .json({ message: "File uploaded successfully", fileName: fileName });
});



route.post("/upload-multiple-files", uploads.array("file", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  res
    .status(200)
    .json({
      message: "Files uploaded successfully",
      fileNames: req.files.map((file) => file.filename),
    });
});

module.exports = route;
