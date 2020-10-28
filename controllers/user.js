const { UserModel } = require("../models/user");
const joi = require("joi");
var md5 = require("md5");
const { Error } = require("mongoose");
const { generateToken, sendotp } = require("../modules/commonFunctions");
const { verify, TokenExpiredError } = require("jsonwebtoken");
const twilio = require("twilio");
const commonFunction = require("../modules/commonFunctions");
const auth = require("../authent/auth");
var params = require("params");
// const {
//   UsageRecordInstance,
// } = require("twilio/lib/rest/supersim/v1/usageRecord");

//-----------------------------------------------------------------------SignUp//-----------------------------------------------------------------------------

exports.signup = async function (req, res) {
  try {
    let { name, email, mobile, password, country_code, admin } = req.body;
    console.log(req.body, "SINGUP DETAILS");
    const schema = joi.object().keys({
      email: joi.string().required(),
      mobile: joi.number().required(),
      password: joi.string().required(),
      country_code: joi.string().required(),
      name: joi.string().required(),
      admin: joi.boolean().required(),
    });
    const result = schema.validate(req.body, { abortEarly: true });
    if (result.error) {
      throw new Error(result.error);
    }
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
    let checkUser = await UserModel.findOne({ email, password });
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
    const schema = joi.object().keys({
      email: joi.string(),
      mobile: joi.number(),
      password: joi.string(),
      country_code: joi.string(),
      name: joi.string(),
    });

    let result = schema.validate(req.body, { abortEarly: true });
    if (result.error) {
      throw new Error(result.error);
    }

    // console.log("Hitting update middleware");
    console.log(req);
    // let accesstoken = req.headers.accesstoken; // remove
    let updatedata = await UserModel.findOneAndUpdate(
      req.user._id || req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: 1,
      message: "profile updated successfully",
      userdata: updatedata,
    });
  } catch (error) {
    return res.status(400).json({ status: 0, message: error.message });
  }
};

// ======================================================================DELETE USERS BY ID========================================================================//

exports.deleteUser = async (req, res) => {
  try {
    let deleteUser = await UserModel.findByIdAndRemove(
      req.body.id || req.params.id
    );
    if (deleteUser) {
      console.log("Got deleted. ");
      res.status(200).json({ deleteUser });
    } else {
      res.status(400).json({ message: "Can't delete data right now. " });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

//-------------------------------------------------------------FORGOT PASSWORD-----------------------------------------------------------------------------------------------------------------------------------------

exports.forgotPassword = async (req, res) => {
  try {
    console.log("forgot password hit");
    res.send(
      '<form action="/resetpassword" method="POST">' +
        '<input type="email" name="email" value="" placeholder="Enter your email address..." />' +
        '<input type="submit" value="Reset Password" />' +
        "</form>"
    );
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//----------------------------------------------------------------PASSWORD RESET---------------------------------------------------------------------------------------//
exports.resetPassword = async (req, res) => {
  try {
    console.log("reset pass hit");
    let { userid, password, email } = req.body;
    const userdata = await UserModel.find({ email: email });
    console.log(userdata, "jh");
    console.log("userdata id is", userdata[0].id);
    if (!userdata) {
      res.status(400).json({ message: "NO SUCH USER EXIST" });
    }
    let havingsamepassword = await UserModel.findOne({
      _id: userid,
      password: md5(password),
    });

    if (havingsamepassword) {
      throw new Error("New password cannot be the same as old password.");
    }
    userdata = await UserModel.findOneAndUpdate(
      { _id: userid },
      { password: md5(password) }
    );
    if (userdata) {
      return res.status(200).json({ message: "password update succesfully" });
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//---------------------------------------------------------------------Get All USERS --------------------------------------------------------------------------------------------------------------------------------------------------------
exports.getAllUser = async (req, res, next) => {
  try {
    let userList = await UserModel.find({});
    if (userList) {
      res.status(200).json({ "All User Data ": userList });
      res.render(userList);
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

//----------------------------------------------------------------------GET USER bY ID-----------------------------------------------------------------------------------------------------------
exports.getUserById = async (req, res, next) => {
  try {
    console.log("below getuserbyid.");
    let user = await UserModel.findById(req.user.user._id || req.params.id);
    if (user) {
      console.log(`The details of ${user.name} is : ${user}`);
      res.status(200).json({ message: user });
    } else {
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

//----------------------------------------------------------------------block user -------------------------------------------------------------------------------------------------------------------

exports.blockUser = async (req, res, next) => {
  try {
    console.log("blocked user appi hit.");
    let blockedUser = await UserModel.findByIdAndUpdate(
      { _id: req.body.id || req.params.id },
      { blocked: true },
      { new: true }
    );
    if (blockedUser) {
      res.status(200).json({ message: ` ${blockedUser.name} is blocked now` });
    } else {
      res.status(200).json({ message: "unable to block user" });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//-------------------------------------------------------------------unblock user ------------------------------------------------------------------------

exports.unblockUser = async (req, res, next) => {
  try {
    console.log("unblocked user appi hit.");
    let unblockedUser = await UserModel.findByIdAndUpdate(
      { _id: req.body.id || req.params.id },
      { blocked: false },
      { new: true }
    );
    if (unblockedUser) {
      res
        .status(200)
        .json({ message: `${unblockedUser.name}  is unblocked now` });
    } else {
      res.status(200).json({ message: "unable to unblock user" });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
//-------------------------------------------------------------------------...smamdm----------------------------------------------------------------------------------------------------------------------------------
