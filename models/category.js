
const mongoose = require ("mongoose");
const { string, required } = require("joi");

const cateogrySchema = new mongoose.Schema({
    name : {
        type : String,
        //required : true
    },
    description: String,
});

exports.cateogryModel=mongoose.model("category",cateogrySchema);