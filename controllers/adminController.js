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


//----------------------------------------------------------------------block user -------------------------------------------------------------------------------------------------------------------

exports.blockUser = async (req, res, next) => {
    try {
      console.log(req.body.id,"blocked user appi hit.");
      let blockedUser = await UserModel.findByIdAndUpdate(
        { _id:req.body.id},
        {blocked :true },
        { new: true }
      );
      
      console.log(blockedUser.blocked,"user")
      if (blockedUser.blocked) {
        res.status(200).json({ message: ` ${blockedUser.email} is blocked now` });
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
          .json({ message: `${unblockedUser.email}  is unblocked now` });
      } else {
        res.status(200).json({ message: "unable to unblock user" });
      }
    } catch (error) {
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