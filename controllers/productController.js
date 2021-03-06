const { productModel } = require("../models/product");
const { cateogryModel } = require("../models/Category");
const { subcategoryModel } = require("../models/subcategory");
const joi = require("joi");
const { Error } = require("mongoose");
const { generateToken, sendotp } = require("../modules/commonFunctions");
const { verify, TokenExpiredError } = require("jsonwebtoken");
const commonFunction = require("../modules/commonFunctions");
const auth = require("../authent/auth");
var params = require("params");
const mongoose = require("../modules/db_connection");

exports.addProduct = async function (req, res) {
  try {
    let data = req.body;
    let file = req.files;

    console.log(data,file,"lk");
    let name = data.name;
    // console.log("hit",data.name)
    let isProductExist = await productModel.findOne({
      name:name,
    });
    if (isProductExist) {
      throw new Error(`${name}  product is already defiend.`);
    }
    if(file){
      // console.log(file[0].filename,"filename")
      data.image = `/productimage/${file[0].filename}`
    }

    let a = new productModel({
      name: data.name,
      price:data.price,
      subcategoryId:data.subcategoryId,
      categoryId:data.categoryId,
      image:data.image,
      description:data.description,
      brand:data.brand,
    });
    console.log("hit",a);
    let saveProduct = await a.save();
    if (!saveProduct) {
      throw new Error("unable to add the Product");
    }
    res.json({ message: saveProduct });
  } catch (err) {
    res.json({ message: err.message });
  }
};

//---------------------------------------------------------update subcategory with id -------------------------------------------------------------------------------------

exports.updateProduct = async (req, res) => {
  try {
    let updateData = await productModel.findOneAndUpdate(
      {
        _id: req.body.id || req.headers.id || req.params.id,
      },
      { $set: req.body },
      { new: true }
    );
    if (updateData) {
      res.status(200).json({ "UPDATED DATA": updateData });
    } else {
      res.status(401).json({ message: "Product update not working " });
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

//--------------------------------------------------------------delet wiith id-------------------------------------------------------

exports.deleteProduct = async (req, res) => {
  try {
    let delProduct = await subcategoryModel.deleteOne({ _id: req.body.id });
    if (!delProduct) {
      throw new Error("Cant delete product right now. ");
    }
    return res.json({ deletedData: delProduct });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

//=-----------------------------------------------------get all products--------------------------------------------------------------//
exports.getAllProducts = async (req, res) => {
  try {
    let getProducts = await productModel.find({});
    if (getProducts) {
      res.status(200).json({ "All products are  ": getProducts });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

//-------------------------------------------
