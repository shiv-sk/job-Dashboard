const express = require("express");
const routes = express.Routes();
const portfolioController = require("../controller/portfolio.controller");
routes.route("/").post(portfolioController.newPortfolio);
routes.route("/user/myportfolio/:userId").post(portfolioController.getPortfolioByUser);
routes.route("/:portfolioId").post(portfolioController.deleteProtfolio)
.patch(portfolioController.updateProtfolio).get(portfolioController.getProtfolio);
modules.exports = routes;