const { UserModel } = require("../models/user");
const joi = require("joi");
var md5 = require("md5");
const { Error } = require("mongoose");
const { generateToken, sendotp } = require("../modules/commonFunctions");
const { verify, TokenExpiredError } = require("jsonwebtoken");
const commonFunction = require("../modules/commonFunctions");
const auth = require("../authent/auth");
var params = require("params");


//-----------------------------------------------------------------------SignUp//-----------------------------------------------------------------------------

exports.signup = async function (req, res) {
  try {
    let { name, email, mobile, password, country_code, admin } = req.body;
    // console.log(req.body, "SINGUP DETAILS");
    password = md5(password);
    eamil = email.toLowerCase();
    // var otp = 1234;
    let isMobileNoExist = await UserModel.findOne({ country_code, mobile });
    if (isMobileNoExist) {
      throw new Error("Mobile number is already exist");
    }
    let checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      throw new Error("User already registered!");
    }
    let data = { name, email, mobile, password, country_code, admin };
    // console.log(data);
    let save_user = new UserModel(data);
    let newUser = await save_user.save();
    if (!newUser) {
      throw new Error("Unable to add details.");
    }
    res.status(200).json({ msg: `user created succeefully ${newUser}` });
  } catch (error) {
    res.status(403).json(error.message);
  }
};

// ****************************************************************LOGIN**************************************************************************************************************** //

exports.login = async (req, res) => {
  try {
    const schema = joi.object().keys({
      password: joi.string().required(),
      email: joi.string().required(),
    });
    const result = schema.validate(req.body, { abortEarly: true });

    let { email, password, accesstoken } = req.body;
    console.log(req.body);
    password = md5(password);
    let checkUser = await UserModel.findOne({email,password});
    // console.log(checkUser,"checkuser")
    // console.log(checkUser.blocked,"yyyyy");
    if (checkUser.blocked === false) {
      if (checkUser) {
        accesstoken = commonFunction.generateToken(checkUser);
        checkUser = await UserModel.findOneAndUpdate(
          { _id: checkUser._id },
          { accesstoken: accesstoken },
          { new: true }
        );
        res
          .status(200)
          .json({ msg: "You Logged in succes fully", userDetails: checkUser });
      } else {
        throw new Error("User credentials are not found");
      }
    }else {
      res.status(400).json({message: `${checkUser.name} is not able to login because you are blocked by the admin`})
    }
  } catch (err) {
    res.status(400).json({ message: err });
    console.log(err);
  }
};

//****************************************************************************UPDATEEEEE*****************************************************************************************************************************     */

exports.updateprofile = async (req, res) => {
  try {

    // console.log("Hitting update middleware");
    // let accesstoken = req.headers.accesstoken; // remove
    console.log(req.user.user._id,"k");
    let updatedata = await UserModel.findOneAndUpdate(
      req.user.user._id,
      { $set: req.body },
      { new: true }
    ); //req.user._id comminf from require token
    res.status(200).json({
      status: 1,
      message: "profile updated successfully",
      userdata: updatedata,
    });
  } catch (error) {
    return res.status(400).json({ status: 0, message: error.message });
  }
};



