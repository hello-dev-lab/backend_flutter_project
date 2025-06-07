const adminController = require("../controllers/admin_controller");


module.exports = (app) => {
    app.post("/admin", adminController.registerAdmin);
    app.post("/admin/login", adminController.login);
    app.get("/admin/getAll", adminController.getAllAdmins);
    app.get("/admin/:id", adminController.getAdminById);
    app.put("/admin/:id", adminController.updateAdmin);
    app.delete("/admin/:id", adminController.deleteAdmin);
}