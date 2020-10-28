const { subcategoryModel } = require("../models/subcategory");
const { cateogryModel } = require("../models/Category");
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

exports.deleteSubCategory = async (req,res) => {
try{
  let deleteSubCategory = await subcategoryModel.deleteOne({_id:req.body.id});
  if(!deleteSubCategory){
    throw new Error("Cant delete category right now. ");
  }
  return res.json({deletedData:deleteSubCategory});
}catch (error) {
  res.status(401).json({ message: error });
}

}