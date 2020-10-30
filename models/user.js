const { string, number } = require("joi");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  country_code: {
    type: String,
  },
  accesstoken: {
    type: String,
    default: null,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  blocked : {
    type: Boolean,
    default : false
  }
});
exports.UserModel = mongoose.model("user", userSchema);
