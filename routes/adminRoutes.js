const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../authent/auth");
const commonFunctions = require("../modules/commonFunctions")
const categoryController = require("../controllers/categoryController");
const subcategoryController = require("../controllers/subcategoryController");
const productController = require("../controllers/productController")
const multer = require("multer");
var path = require("path");
const md5 = require("md5");
const { func } = require("joi");

var storage = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,"./upload/productImage")
    },
    filename : function(req,file,cb) {
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({storage:storage});
//-------------------------------------------------- - ROUTES for USERS------------------------------------------------------------------
 
router.delete("/deleteuser",auth.requireToken,commonFunctions.verifyAdmin,adminController.deleteUser);  //by user and admin both
router.get("/userdetails",auth.requireToken,adminController.getUserById); // user 
router.get("/getAllUser",auth.requireToken,commonFunctions.verifyAdmin,adminController.getAllUser);// only by admin
router.get("/getuser",auth.requireToken,commonFunctions.verifyAdmin,adminController.getUserById); // only by admin
router.put("/blockandunblockuser",adminController.blockAndUnblockUser); // only by admin


//--------------------------------------------------- Routes OF PRODUCT Category -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/product/addCategory",auth.requireToken,commonFunctions.verifyAdmin,categoryController.addCategory); //access only by admin
router.get("/product/getAllCategory",auth.requireToken,commonFunctions.verifyAdmin,categoryController.getAllCategory); //access only by admin
router.put("/product/deleteCategory",auth.requireToken,commonFunctions.verifyAdmin,categoryController.deleteCategory) //access only by admin
router.put("/product/updateCategory",auth.requireToken,commonFunctions.verifyAdmin,categoryController.updateCategory) //access only by admin

//----------------------------------------------------Routes of PRODUCT Subcategory------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/product/addsubCategory",auth.requireToken,commonFunctions.verifyAdmin,subcategoryController.addsubCategory);  //access only by admin
router.put("/product/updatesubCategory",auth.requireToken,commonFunctions.verifyAdmin,subcategoryController.updateSubCategory)  //access only by admin
router.put("/product/deletesubCategory",auth.requireToken,commonFunctions.verifyAdmin,subcategoryController.deletesubCategory);  //access only by admin

//------------------------------------------------------ROUTES OF PRODUCTS PRODCTS------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/product/addProduct",upload.any(),auth.requireToken,commonFunctions.verifyAdmin,productController.addProduct);  //access only by admin
router.put("/product/updateProduct",auth.requireToken,commonFunctions.verifyAdmin,productController.updateProduct);  //access only by admin
router.put("/product/deleteProduct",auth.requireToken,commonFunctions.verifyAdmin,productController.deleteProduct); //access only by admin
router.get("/product/getallProducts",auth.requireToken,commonFunctions.verifyAdmin,productController.getAllProducts); //access only by admin


module.exports = router;