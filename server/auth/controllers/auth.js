const User = require('../models/User');
const ErrorResponse = require("../utils/errorResponse")

exports.register = async (req, res, next) => {
  // res.send("Register Route")

  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    //Refactoring with sendToken method
    sendToken(user, 201, res)

    //Below lines were created before Refactoring with sendToken method
    // res.status(201).json({
    //   success: true,
    //   token: "324rfdef34fe",
    //   //The next line was used before creating the token
    //   // user, // or it can be like this -->> user: user
    // });
  } catch (error) {
    next(error)

    //Without middleware and next we can use the below syntax
    // res.status(500).json({
    //   success: false,
    //   error: error.message,
    // });
  }
};

exports.login = async (req, res, next) => {
  // res.send('Login Route');
  const {email, password} = req.body

  if(!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400))

    //Without middleware and next we can use the below syntax
    // res.status(400).json({ success: false, error: "Please provide an email and password"})
  }

  try {
    const user = await User.findOne({email}).select("+password")

    if(!user) {
      return next(new ErrorResponse("Invalid Credentials", 401))

    //Without middleware and next we can use the below syntax
      // res.status(401).json({success: false, error: "Invalid Credentials"})
    }

    const isMatch = await user.matchPassword(password)

    if(!isMatch) {
      return next(new ErrorResponse("Invalid Credentials", 401))

      //Without middleware and next we can use the below syntax
      // res.status(401).json({success: false, error: "Invalid credentials"})
    }

    //Refactoring with sendToken method
    sendToken(user, 200, res)

    //Below lines were created before Refactoring with sendToken method
    // res.status(200).json({
    //   success: true,
    //   token: "asdfe3f3r3r3f3cw3"
    // });
  } catch (error) {
    res.status(500).json({success: false, error: error.message})
  }
};

exports.forgotpassword = (req, res, next) => {
  res.send('Forgot Password Route');
};

exports.resetpassword = (req, res, next) => {
  res.send('Reset Password Route');
};


const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken()
  res.status(statusCode).json({ success: true, token })
}