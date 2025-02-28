const express = require("express");
const routes = express.Routes();
const applicationController = require("../controller/application.controller");
routes.route("/").post(applicationController.newApplication);
routes.route("/:applicationId").delete(applicationController.deleteApplication);
routes.route("/job/:jobId").get(applicationController.getApplicationsByJob);
routes.route("/user/get/allapplications").get(applicationController.getApplicationsOfUser);
modules.exports = routes;