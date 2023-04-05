const mongoose = require("mongoose");
const { jwtSign } = require("../helpers/JWT");
const Category = require("../model/category");
const { getColumns } = require("../helpers/handlers");

const createCategory = async (req, res) => {
  try {
    const categories = await Category.create({...req.body,
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      is_active: req.body.is_active,

    });
    return res.sendResponse({
      data: categories,
    });
  } catch (err) {
    return res.sendError({ message: err });
  }
};

const getCategory = async (req, res) => {
  try {
    const categorys = await Category.find({
      is_active: true,
    });
    return res.sendResponse({
      data:categorys
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};
const getCategories = async (req, res) => {
  try {
    const categorys = await Category.find({
      is_active: true,
    })
    .populate({
      path: "image",
    });
    return res.sendResponse({
      data:{rows:categorys,
           columns: getColumns(Category),}
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};

const updateCategory = async (req, res) => {

    const {_id, name, description } = req.body;


    try {
        const msg = await Category.findOne({ _id: _id });
      
        const result = await Category.updateMany({ _id: _id },{ description ,name } );

        return res.sendResponse({ data: result });
    }

    catch (error) {
        return res.sendError({ message: error.message });
    }
}

const deleteCategory = async (req, res) => {

  try {
      const _id = req.body._id;
      await Category.deleteOne({ _id: _id })
      return res.sendResponse();
  }
  catch (error) {
      return res.sendError({ message: error.message });
  }
}


module.exports = { createCategory, getCategory,getCategories,updateCategory,deleteCategory };
