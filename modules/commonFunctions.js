const jwt = require("jsonwebtoken");
var config = require("../config/development.json");

/*
------------------------------------------------
              Send OTP
------------------------------------------------      
*/

exports.sendotp = (varification_code, mobile_number) => {
  var accountSid = config.accountSid; // Your Account SID from www.twilio.com/console
  var authToken = config.authToken; // Your Auth Token from www.twilio.com/console
  console.log("sendotp hitting");
  var client = new twilio(config.accountSid, config.authToken);
  client.messages
    .create({
      body:
        "your one time password(OTP) is  " +
        varification_code +
        "  valid for 3 minutes do not disclose it",
      to: mobile_number, // Text this number
      from: "+13346978087", // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
};

/*
------------------------------------------------
              genrate token
------------------------------------------------      
*/

exports.generateToken = (user) => {
  return jwt.sign({user}, config.TOKEN_SECRET, { expiresIn: "18000s" });
};

/*
------------------------------------------------
              verify otp
------------------------------------------------      
*/

exports.verifyotp = async (req, res) => {
  try {
    const validation = joi.object().keys({
      user_id: joi
        .string()
        .required()
        .error((e) => "user_id is required"),
      otp: joi
        .number()
        .required()
        .error((e) => "otp is required"),
    });
    validator = joi.validate(req.body, validation, { abortEarly: true });

    if (validator.error) {
      throw new Error(validator.error.details[0].message);
    }
    let { otp, user_id } = req.body;

    let user_details = await user.findOne({ _id: user_id }).exec();

    if (user_details) {
      if (user_details.otp == otp) {
        userdata = await user
          .findOneAndUpdate(
            { _id: user_id },
            { verified: 1, is_otp_verified: 1 },
            { new: true }
          )
          .exec();

        return res.status(200).json({
          status: 1,
          message: "OTP Verified Successfully",
          userdata: userdata,
        });
      } else {
        throw new Error("Invalid verification code.");
      }
    }
    throw new Error("invalid user_id");
  } catch (error) {
    res.status(400).json({ status: 0, message: error.message });
  }
};

// ------------------------------------------------------------------------VERIFY ADMIN --------------------------------------------------------//

exports.verifyAdmin = async (req,res,next) => {
  try{
    let isAdmin = req.user.user.admin;
    
    if (isAdmin){
      console.log("welcome admin")
      next();
    }
  } catch(error){
    res.status(400).json({status : 0 , message :error.message});
  }
}

