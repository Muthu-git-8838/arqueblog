const mongoose = require("mongoose");
const { jwtSign } = require("../helpers/JWT");
const Posttype = require("../model/posttype");

const getPostTypes = async (req, res) => {
  try {
    const posttypes = await Posttype.find({
      is_active: true,
    });
    return res.sendResponse({
      data: posttypes,
    });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};

module.exports = { getPostTypes };
