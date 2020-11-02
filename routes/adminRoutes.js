const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../authent/auth");
const commonFunctions = require("../modules/commonFunctions")





router.delete("/deleteuser",auth.requireToken,adminController.deleteUser);  //by user and admin both
router.get("/userdetails",auth.requireToken,adminController.getUserById); // user 
router.get("/getAllUser",auth.requireToken,commonFunctions.verifyAdmin,adminController.getAllUser);// only by admin
router.get("/getuser",auth.requireToken,commonFunctions.verifyAdmin,adminController.getUserById); // only by admin
router.put("/blockuser",auth.requireToken,commonFunctions.verifyAdmin,adminController.blockUser); // only by admin
router.post("/unblockuser",auth.requireToken,commonFunctions.verifyAdmin,adminController.unblockUser); // only by admin

module.exports = router;