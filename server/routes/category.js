// importing modules
const express = require("express");
const router = express.Router();
const { getCategory,getCategories,createCategory ,updateCategory,deleteCategory} = require("../controllers/category");

const { celebrate, Joi, errors, Segments } = require("celebrate");
const validateAdmin = require("../middlewares/validateAdmin");

module.exports = (app) => {
  router.get("/get", getCategory);
  router.get("/",validateAdmin, getCategories);

  // router.use(validateAdmin)

  router.post(
    "/",
    // validateJwtToken,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        // _id: Joi.number().optional(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        is_active: Joi.boolean().required(),

        // image: Joi.array().default([]),
      }),
    }),
    createCategory
  );
  
  router.put("/", celebrate({
    // [Segments.PARAMS]: Joi.object().keys({
    //   _id: Joi.string().required(),
    // }),
    [Segments.BODY]: Joi.object().keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        is_active: Joi.boolean().required(),

        // image: Joi.array().default([]),
    })
}), updateCategory);




  router.delete("/", celebrate({
    [Segments.BODY]: Joi.object().keys({
      _id: Joi.string().required(),
    })
}), deleteCategory);

  app.use("/api/v1/category", router);
};


