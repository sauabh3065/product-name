const mongoose = require("mongoose");
const { string, required } = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    //required : true
  },
  price: Number,
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "subcategory" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
});

exports.productModel = mongoose.model("products", productSchema);
