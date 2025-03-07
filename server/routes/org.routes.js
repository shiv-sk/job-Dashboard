const express = require("express");
const routes = express.Router();

const orgController = require("../controller/org.controller");
const upload = require("../middleware/multer.middleware");
const {newOrgSchema , updateOrgSchema} = require("../validation/org.validation");
const validateInput = require("../middleware/validation.middleware");

const parseArrayFields = require("../middleware/parsing.middleware");
const fieldsToParse = ["socialLinks"];

routes.route("/").post(upload.single("logo") , parseArrayFields(fieldsToParse), validateInput(newOrgSchema), orgController.newOrg);
routes.route("/user/:userId").get(orgController.getOrgByUser);
routes.route("/:orgId")
.patch(upload.single("logo") , parseArrayFields(fieldsToParse), validateInput(updateOrgSchema) , orgController.updateOrg)
.delete(orgController.deleteOrg);
module.exports = routes;