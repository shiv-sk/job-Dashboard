const express = require("express");
const routes = express.Router();
const userController = require("../controller/user.controller");
const userValidation = require("../validation/user.validation");
const validateInput = require("../middleware/validation.middleware");
routes.route("/register").post(validateInput(userValidation.userRegisterSchema), userController.register);
routes.route("/login").post(validateInput(userValidation.userLoginSchema), userController.login);
routes.route("/logout").get(userController.logOut);
routes.route("/users").get(userController.getAllUsers);
routes.route("/currentuser").get(userController.currentUser);
routes.route("/:userId").get(userController.getUser)
.patch(userController.updateUser).delete(userController.deleteUser);
module.exports = routes;