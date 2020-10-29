const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const subcategoryController = require("../controllers/subcategoryController");

const auth = require("../authent/auth");
const { Router } = require("express");
const commonFunctions = require("../modules/commonFunctions")

router.post("/addCategory",categoryController.addCategory);
router.get("/getAllCategory",categoryController.getAllCategory);
router.put("/deleteCategory",categoryController.deleteCategory)
router.put("/updateCategory",categoryController.updateCategory)


router.post("/addsubCategory",subcategoryController.addsubCategory);
router.put("/updatesubCategory",subcategoryController.updateSubCategory)
router.put("/deletesubCategory",subcategoryController.deleteSubCategory);



module.exports = router;