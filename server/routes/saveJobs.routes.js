const express = require("express");
const routes = express.Router();
const saveJobController = require("../controller/savejob.controller");
routes.route("/").post(saveJobController.newSaveJob);
routes.route("/user/:userId").get(saveJobController.getSavedJobByUser);
routes.route("/:saveJobId").delete(saveJobController.deleteSaveJob)
module.exports = routes;