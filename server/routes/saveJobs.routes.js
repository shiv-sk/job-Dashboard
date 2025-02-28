const express = require("express");
const routes = express.Routes();
const saveJobController = require("../controller/savejob.controller");
routes.route("/").post(saveJobController.newSaveJob);
routes.route("/user/savedjobs").get(saveJobController.getSavedJobByUser);
routes.route("/:saveJobId").delete(saveJobController.deleteSaveJob).patch(saveJobController.updateSaveJob);
modules.exports = routes;