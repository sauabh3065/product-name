const { subcategoryModel } = require("../models/subcategory");
const { cateogryModel } = require("../models/Category");
const {productModel}= require('../models/product')
const joi = require("joi");
const { Error } = require("mongoose");
const { generateToken, sendotp } = require("../modules/commonFunctions");
const { verify, TokenExpiredError } = require("jsonwebtoken");
const commonFunction = require("../modules/commonFunctions");
const auth = require("../authent/auth");
var params = require("params");
const mongoose = require("../modules/db_connection");

exports.addsubCategory = async function (req, res) {
  try {
    let data = req.body;
    // console.log("hit",data.name)
    let isSubCategoryExist = await subcategoryModel.findOne({
      name: data.name,
    });
    if (isSubCategoryExist) {
      throw new Error(`${data.name} subcategory is already defiend.`);
    }
    let as = new subcategoryModel(data);
    let saveSubCategory = await as.save();
    console.log("hit", saveSubCategory);
    if (!saveSubCategory) {
      throw new Error("unable to add the category");
    }
    res.json({ message: saveSubCategory });
  } catch (err) {
    res.json({ message: err.message });
  }
};


//---------------------------------------------------------update subcategory with id -------------------------------------------------------------------------------------


exports.updateSubCategory = async (req, res) => {
  try {
    console.log(req.body.id, req.body.name, "hit");
    let updateData = await subcategoryModel.findOneAndUpdate({
      _id: req.body.id || req.headers.id || req.params.id},
      { $set: { name: req.body.name } },
      { new: true }
    );
    if (updateData) {
      res.status(200).json({ "UPDATED DATA": updateData });
    } else {
      res.status(401).json({ message: "DATA update not working " });
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

//--------------------------------------------------------------delet wiith id-------------------------------------------------------
exports.deletesubCategory = async (req, res) => {
  try {
    console.log("hit", req.body.id);
    let del = await productModel.deleteMany({subcategoryId: req.body.id });
    if (del) {
      let del2 = await subcategoryModel.deleteMany({ _id: req.body.id });
      console.log(del, del2, "delete");
    }
    res.json({ message: del, response: del2 });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
