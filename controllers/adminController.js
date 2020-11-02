const { UserModel } = require("../models/user");
// const joi = require("joi");
const { Error } = require("mongoose");
// const { generateToken, sendotp } = require("../modules/commonFunctions");
const { verify, TokenExpiredError } = require("jsonwebtoken");
const commonFunction = require("../modules/commonFunctions");
const auth = require("../authent/auth");
var params = require("params");

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

//----------------------------------------------------------------------Block/Unblock user -------------------------------------------------------------------------------------------------------------------

exports.blockAndUnblockUser = async (req, res, next) => {
  try {
    console.log(req.body.id, "blocked user appi hit.");
    let user = await UserModel.findById({_id:req.body.id });
    if (user.blocked === true) {
      let unblockUser = await UserModel.findByIdAndUpdate(
        { _id: req.body.id || req.params.id },
        { blocked: false },
        { new: true }
      );
      return res.json({ message: ` ${unblockUser.email} is unblocked now` });
    } else {
      let blockUser = await UserModel.findByIdAndUpdate({_id:req.body.id},{blocked:true},{new:true});
      return res.json({message:` ${blockUser.email} is blocked now`})
    }
  } catch (err) {
    res.status(400).json({
      message: error.message,
    });
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
