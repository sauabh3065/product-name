const express = require("express");
const router = express.Router();
// const ProductController = require("../controllers/productcontroller");
const user_controller = require("../controllers/user");
const auth = require("../authent/auth");
const { Router } = require("express");
const commonFunctions = require("../modules/commonFunctions")



// --------------------------------------------------------------USER ROUTES-------------------------------------------------------------------------------------//
router.post("/signup", user_controller.signup);
router.post("/login", user_controller.login);
router.put("/updateprofile/:id", auth.requireToken, user_controller.updateprofile); // by login person only 
router.delete("/deleteuser/:id",auth.requireToken,user_controller.deleteUser);     // by login person only
router.get("/forgotpassword",user_controller.forgotPassword);
router.post("/resetpassword",user_controller.resetPassword);
router.get("/userdetails",auth.requireToken,user_controller.getUserById);


router.get("/getAllUser",auth.requireToken,commonFunctions.verifyAdmin,user_controller.getAllUser);
router.get("/getuser/:id",auth.requireToken,commonFunctions.verifyAdmin,user_controller.getUserById);
router.post("/blockuser/:id",auth.requireToken,commonFunctions.verifyAdmin,user_controller.blockUser);
router.post("/unblockuser/:id",auth.requireToken,commonFunctions.verifyAdmin,user_controller.unblockUser)











module.exports = router;