const express = require("express");
const router = express.Router();
// const ProductController = require("../controllers/productcontroller");
const productController = require("../controllers/productController");
const auth = require("../authent/auth");
const { Router } = require("express");
const commonFunctions = require("../modules/commonFunctions")

router.post("/addCategory",productController.addCategory);
router.get("/getAllCategory",productController.getAllCategory);
router.put("/deleteCategory/:id",productController.deleteCategory)
router.put("/updateCategory",productController.updateCategory)




module.exports = router;