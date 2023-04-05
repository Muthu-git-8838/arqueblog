// importing modules
const express = require("express");
const router = express.Router();
const { signup, login, verifyEmail, resendEmail, forgotPassword, updatePassword,adminLogin } = require("../controllers/auth");

const { celebrate, Joi, errors, Segments } = require("celebrate");
const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError = "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length"


module.exports = (app) => {

  
    // verify OTP
    router.get("/verify-email/:verifyToken", celebrate({
      [Segments.PARAMS]: Joi.object().keys({
          verifyToken: Joi.string().required(),
      })
  }), verifyEmail);

  router.post("/resendEmail", celebrate({
      [Segments.BODY]: Joi.object().keys({
          email: Joi.string().required()
      })
  }), resendEmail);

  router.post("/forgot-password", celebrate({
      [Segments.BODY]: Joi.object().keys({
          email: Joi.string().email().required()
      })
  }), forgotPassword);

  router.post("/update-password", celebrate({
      [Segments.BODY]: Joi.object().keys({
          newPassword: Joi.string().regex(strongPasswordRegex).message(stringPassswordError).required(),
          forgotPasswordToken: Joi.string().required()
      })
  }), updatePassword);

  router.post(
    "/signup",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        categories: Joi.array().required(),
        terms_conditions: Joi.boolean().required(),
        user_attachments: Joi.array().required(),
      }),
    }),
    signup
  );

  router.post(
    "/",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    }),
    login
  );

  router.post(
    "/admin",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    }),
    adminLogin
  );

  app.use("/api/v1/auth", router);
};
