const express = require("express");
const routes = express.Routes();
const jobController = require("../controller/jobs.controller");
routes.route("/").post(jobController.newJob);
routes.route("/").get(jobController.allJobs);
routes.route("/org/:orgId").get(jobController.getJobsByOrg);
routes.route("/:jobId").pacth(jobController.updateJob).delete(jobController.deleteJob).get(jobController.getJob);
modules.exports = routes;