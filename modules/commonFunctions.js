const jwt = require("jsonwebtoken");
var config = require("../config/development.json");

//---------------------------------------------------------------------------------------------------------------------------------------------------
//            genrate token
//-------------------------------------------------------------------------------------------------------------------------------------------------------

exports.generateToken = (user) => {
  return jwt.sign({ user }, config.TOKEN_SECRET, { expiresIn: "18000s" });
};

// ------------------------------------------------------------------------VERIFY ADMIN --------------------------------------------------------//

exports.verifyAdmin = async (req, res, next) => {
  try {
    let isAdmin = req.user.user.admin;
    if (isAdmin) {
      console.log("welcome admin");
      next();
    }
  } catch (error) {
    res.status(400).json({ status: 0, message: error.message });
  }
};
