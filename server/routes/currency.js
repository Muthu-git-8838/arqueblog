// importing modules
const express = require("express");
const router = express.Router();
const { getCurrency } = require("../controllers/currency");

const { celebrate, Joi, errors, Segments } = require("celebrate");

module.exports = (app) => {
  router.get("/", getCurrency);
  app.use("/api/v1/currency", router);
};
