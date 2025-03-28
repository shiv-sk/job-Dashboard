const express = require("express");
const routes = express.Router();
const applicationController = require("../controller/application.controller");
routes.route("/").post(applicationController.newApplication);
routes.route("/:applicationId").delete(applicationController.deleteApplication);
routes.route("/job/:jobId").get(applicationController.getApplicationsByJob);
routes.route("/user/get/:userId").get(applicationController.getApplicationsOfUser);
module.exports = routes;