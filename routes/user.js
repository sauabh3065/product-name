const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");
const auth = require("../authent/auth");
const { Router } = require("express");
const commonFunctions = require("../modules/commonFunctions")



// --------------------------------------------------------------USER ROUTES-------------------------------------------------------------------------------------//
router.post("/signup", user_controller.signup);
router.post("/login", user_controller.login);
router.put("/updateprofile", auth.requireToken, user_controller.updateprofile); // by login person only 




module.exports = router;