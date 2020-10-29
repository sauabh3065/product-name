const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const subcategoryController = require("../controllers/subcategoryController");
const productController = require("../controllers/productController")
const auth = require("../authent/auth");
const { Router } = require("express");
const commonFunctions = require("../modules/commonFunctions")


//-------------------------------------routes of category -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/addCategory",categoryController.addCategory);
router.get("/getAllCategory",categoryController.getAllCategory);
router.put("/deleteCategory",categoryController.deleteCategory)
router.put("/updateCategory",categoryController.updateCategory)

//----------------------------------routes of subcategory------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/addsubCategory",subcategoryController.addsubCategory);
router.put("/updatesubCategory",subcategoryController.updateSubCategory)
router.put("/deletesubCategory",subcategoryController.deleteSubCategory);

//--------------------------------------Routes of products------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/addProduct",productController.addProduct);
router.put("/updateProduct",productController.updateProduct)
router.put("/deleteProduct",productController.deleteProduct);




module.exports = router;