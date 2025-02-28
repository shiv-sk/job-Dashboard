const express = require("express");
const routes = express.Routes();
const userController = require("../controller/user.controller");
routes.route("/register").post(userController.register);
routes.route("/login").post(userController.login);
routes.route("/logout").post(userController.logOut);
routes.route("/users").post(userController.getAllUsers);
routes.route("/currentuser").post(userController.currentUser);
routes.route("/:userId").post(userController.getUser).get(userController.getUser)
.patch(userController.updateUser).delete(userController.deleteUser);
modules.exports = routes;