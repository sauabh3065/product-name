const mongoose = require("mongoose");
const { string, required } = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image:[String],
  price: Number,
  description : String,
  Specification : String,
  brand : String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "subcategory" },
});

exports.productModel = mongoose.model("products", productSchema);
