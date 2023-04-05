const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose.connect("mongodb+srv://muthumani8838elonnative:Smmani883830@cluster0.yzb8mwo.mongodb.net/?retryWrites=true&w=majority");
};

module.exports = connectDB;
