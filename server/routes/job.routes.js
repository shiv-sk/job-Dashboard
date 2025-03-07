const express = require("express");
const routes = express.Router();
const jobController = require("../controller/jobs.controller");
const {newJobSchema , updateJobSchema} = require("../validation/job.validation");
const validateInput = require("../middleware/validation.middleware");
routes.route("/").post(validateInput(newJobSchema) , jobController.newJob);
routes.route("/").get(jobController.allJobs);
routes.route("/org/:orgId").get(jobController.getJobsByOrg);
routes.route("/:jobId").patch(validateInput(updateJobSchema), jobController.updateJob)
.delete(jobController.deleteJob).get(jobController.getJob);
module.exports = routes;