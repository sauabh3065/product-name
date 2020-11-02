const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const subcategoryController = require("../controllers/subcategoryController");
const productController = require("../controllers/productController")
const auth = require("../authent/auth");
const { Router } = require("express");
const commonFunctions = require("../modules/commonFunctions");
const { verify } = require("jsonwebtoken");


//--------------------------------------------------------------routes of category -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/addCategory",auth.requireToken,commonFunctions.verifyAdmin,categoryController.addCategory); //access only by admin
router.get("/getAllCategory",auth.requireToken,commonFunctions.verifyAdmin,categoryController.getAllCategory); //access only by admin
router.put("/deleteCategory",auth.requireToken,commonFunctions.verifyAdmin,categoryController.deleteCategory) //access only by admin
router.put("/updateCategory",auth.requireToken,commonFunctions.verifyAdmin,categoryController.updateCategory) //access only by admin

//-------------------------------------------------------------routes of subcategory------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/addsubCategory",auth.requireToken,commonFunctions.verifyAdmin,subcategoryController.addsubCategory);  //access only by admin
router.put("/updatesubCategory",auth.requireToken,commonFunctions.verifyAdmin,subcategoryController.updateSubCategory)  //access only by admin
router.put("/deletesubCategory",auth.requireToken,commonFunctions.verifyAdmin,subcategoryController.deletesubCategory);  //access only by admin

//-------------------------------------------------------------Routes of products------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/addProduct",auth.requireToken,commonFunctions.verifyAdmin,productController.addProduct);  //access only by admin
router.put("/updateProduct",auth.requireToken,commonFunctions.verifyAdmin,productController.updateProduct);  //access only by admin
router.put("/deleteProduct",auth.requireToken,commonFunctions.verifyAdmin,productController.deleteProduct); //access only by admin
router.get("/getallProducts",auth.requireToken,commonFunctions.verifyAdmin,productController.getAllProducts); //access only by admin




module.exports = router;