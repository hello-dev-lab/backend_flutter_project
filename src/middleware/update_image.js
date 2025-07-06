const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + ext;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });
module.exports = upload;
