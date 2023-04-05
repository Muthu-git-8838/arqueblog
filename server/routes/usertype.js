// importing modules
const express = require("express");
const router = express.Router();
const { getProfileTypes } = require("../controllers/userttype");

const { celebrate, Joi, errors, Segments } = require("celebrate");

module.exports = (app) => {
  router.get("/", getProfileTypes);
  app.use("/api/v1/usertype", router);
};
