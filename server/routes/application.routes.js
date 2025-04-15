const express = require("express");
const routes = express.Router();
const applicationController = require("../controller/application.controller");
const {applicationSchema} = require("../validation/application.validation");
const validateInput = require("../middleware/validation.middleware");
routes.route("/").post(validateInput(applicationSchema) , applicationController.newApplication);
routes.route("/:applicationId").delete(applicationController.deleteApplication);
routes.route("/job/:jobId").get(applicationController.getApplicationsByJob);
routes.route("/user/get/:userId").get(applicationController.getApplicationsOfUser);

//aggregation routes
routes.route("/received/applications/:jobId").get(applicationController.totalApplicationsRecevied);
routes.route("/applied/applications/:userId").get(applicationController.applicationsSubmitted);
routes.route("/skillgap/user/:applicationId").get(applicationController.skillGapGraph);
module.exports = routes;