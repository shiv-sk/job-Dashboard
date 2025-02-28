const express = require("express");
const routes = express.Routes();
const orgController = require("../controller/org.controller");
routes.route("/").post(orgController.newOrg);
routes.route("/user/:userId").get(orgController.getOrgByUser);
routes.route("/:orgId").patch(orgController.deleteOrg).delete(orgController.updateOrg);
modules.exports = routes;