const express = require("express");
const routes = express.Router();
const portfolioController = require("../controller/portfolio.controller");

const {newProtfolioSchema , updateProtfolioSchema , portfolioScore} = require("../validation/portfolio.validation");
const validateInput = require("../middleware/validation.middleware");
const parseArrayFields = require("../middleware/parsing.middleware");
const fieldsToParse = ["skills" , "courses" , "projects" , "sociallinks" , "extracurricularactivities" , 
    "additionaldetails" , "address" , "experience" , "education"];

const upload = require("../middleware/multer.middleware"); 
routes.route("/")
.post(upload.single("resume") , 
parseArrayFields(fieldsToParse), 
validateInput(newProtfolioSchema), portfolioController.newPortfolio);

routes.route("/user/myportfolio/:userId").get(portfolioController.getPortfolioByUser);
routes.route("/:portfolioId")
.delete(portfolioController.deleteProtfolio)
.patch(upload.single("resume") , parseArrayFields(fieldsToParse), validateInput(updateProtfolioSchema), portfolioController.updateProtfolio)
.get(portfolioController.getProtfolio);
routes.route("/user/portfolio/score").post(validateInput(portfolioScore), portfolioController.profileScore);
module.exports = routes;