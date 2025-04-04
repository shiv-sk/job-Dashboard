const express = require("express");
const routes = express.Router();
const applicationController = require("../controller/application.controller");
const {applicationSchema} = require("../validation/application.validation");
const validateInput = require("../middleware/validation.middleware");
routes.route("/").post(validateInput(applicationSchema) , applicationController.newApplication);
routes.route("/:applicationId").delete(applicationController.deleteApplication);
routes.route("/job/:jobId").get(applicationController.getApplicationsByJob);
routes.route("/user/get/:userId").get(applicationController.getApplicationsOfUser);
module.exports = routes;