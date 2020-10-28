const connection = require("../modules/db_connection");
const { UserModel } = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require('../config/development.json')
exports.requireToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (token === null) {
      res.sendStatus(401);
      res.json({ msg: "token is not available" });
    } // if there isn't any token
    jwt.verify(token, config.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).res.json({ msg: "Jwt verification error" });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(400).json({ message: err });
    console.log(err);
  }
};
