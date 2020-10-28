const { cateogryModel } = require("../models/productmodel");
const joi = require("joi");
var md5 = require("md5");
const { Error } = require("mongoose");
const { generateToken, sendotp } = require("../modules/commonFunctions");
const { verify, TokenExpiredError } = require("jsonwebtoken");
const commonFunction = require("../modules/commonFunctions");
const auth = require("../authent/auth");
var params = require("params");

exports.addCategory = async function (req, res) {
  try {
    let data = req.body;
    // console.log("hit",data.name)
    let isCategoryExist = await cateogryModel.findOne({ name: data.name });
    if (isCategoryExist) {
      throw new Error(`${data.name} category is already defiend.`);
    }
    let as = new cateogryModel(data);
    let saveCategory = await as.save();
    console.log("hit", saveCategory);
    if (!saveCategory) {
      throw new Error("unable to add the category");
    }
    res.json({ message: saveCategory });
  } catch (err) {
    res.json({ message: err.message });
  }
};

//---------------------------------------------------Get All Category---------------------------------------//

exports.getAllCategory = async (req, res) => {
  try {
    cateogryModel.find((err, data) => {
      if (!err) {
        res.status(200).json({ data });
      } else {
        res.status(400).json({ message: console.error.message });
      }
    });
  } catch (error) {
    res.status(403).json({ message: console.error.message });
  }
};

//==========================================================================DElete product with id==================================================================================

exports.deleteCategory = async (req, res) => {
  try {
    let deletecat = await cateogryModel.findOneAndDelete(
      req.body.id || req.headers.id || req.params.id
    );
    console.log("here");
    if (deletecat) {
      console.log("Got deleted. ");
      res.status(200).json({ deletecat });
    } else {
      res.status(400).json({ message: "Can't delete category right now. " });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

//=======================================================================update=========================================================
exports.updateCategory = async (req, res) => {
  try {
    console.log(req.body.id, req.body.name, "hit");
    let updateData = await cateogryModel.findOneAndUpdate({
      _id: req.body.id || req.headers.id || req.params.id},
      { $set: { name: req.body.name } },
      { new: true }
    );
    console.log(updateData, "2nf");
    if (updateData) {
      res.status(200).json({ "UPDATED DATA": updateData });
    } else {
      res.status(401).json({ message: "DATA update not working " });
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
