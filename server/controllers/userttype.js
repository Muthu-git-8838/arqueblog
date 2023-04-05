const mongoose = require("mongoose");
const Category = require("../model/category");
const Usertype = require("../model/usertype");

const getProfileTypes = async (req, res) => {
  try {
    const userTypes = await Usertype.find({
      is_active: true,
    }).sort({'createdAt': 'asc'});
    return res.sendResponse({
      data: userTypes,
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};

module.exports = { getProfileTypes };
