// importing modules
const express = require("express");
const router = express.Router();
const { getPostTypes } = require("../controllers/posttype");

const { celebrate, Joi, errors, Segments } = require("celebrate");

module.exports = (app) => {
  router.get("/", getPostTypes);
  app.use("/api/v1/posttype", router);
};
