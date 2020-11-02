const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../authent/auth");
const commonFunctions = require("../modules/commonFunctions")





router.delete("/deleteuser/:id",auth.requireToken,adminController.deleteUser);
router.get("/userdetails",auth.requireToken,adminController.getUserById);
router.get("/getAllUser",auth.requireToken,commonFunctions.verifyAdmin,adminController.getAllUser);
router.get("/getuser/:id",auth.requireToken,commonFunctions.verifyAdmin,adminController.getUserById);
router.put("/blockuser",auth.requireToken,commonFunctions.verifyAdmin,adminController.blockUser);
router.post("/unblockuser/",auth.requireToken,commonFunctions.verifyAdmin,adminController.unblockUser);

module.exports = router;