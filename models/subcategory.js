const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
});


exports.subcategoryModel = mongoose.model("subcategory",subcategorySchema);
