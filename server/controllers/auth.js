const { jwtSign } = require("../helpers/JWT");
const User = require("../model/user");
const moment = require("moment");
const bcrypt = require("bcrypt");
const sendMail = require("../helpers/sendMail");
const crypto = require("crypto");
const saltRounds = 10;

const signup = async (req, res) => {
  const { email } = req.body;
  // const session = await mongoose.startSession();
  // session.startTransaction();
  try {
    const userEmailExists = await User.findOne({ email });
    if (userEmailExists) {
      return res.sendError({ message: "Email already exists!" });
    }

    const verifyToken = crypto.randomBytes(16).toString("hex");
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const user = await User.create({
      ...req.body,
      verifyToken,
      verifyTokenCreatedAt: moment().utc(),
      password: hash,
    });
    sendMail({
      to: email,
      html: `<b>Please verify this url to access Blog ${process.env.SERVER_DOMAIN}/api/v1/auth/verify-email/${verifyToken}</b>`,
    });
    // await session.endSession();
    return res.sendResponse({
      data: user,
      message: "User created successfully",
    });
  } catch (err) {
    // await session.abortTransaction();
    return res.sendError({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.sendError({statusCode:401,  message: "User not found!" });
    if (!user.isActive) return res.sendError({statusCode:401,  message: "User is inactive!" });
    if (user.verifyToken)
      return res.sendError({ statusCode:401, message: "Please verify your email to login!" });

    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      var accessToken = jwtSign({ userId: user._id });
      if (accessToken) {
        await user.update({
          accessToken,
          accessTokenCreatedAt: moment().utc(),
        });
        return res.sendResponse({
          data: {
            accessToken,
            user: {
              email: user.email,
              userId: user._id,
            }
          },
          message:"User loggedin successfully!"
        });
      }
    }
    return res.sendError({statusCode:401,  message: "Password is not correct!" });
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email, isAdmin: true
    });
    console.log("s--ss>>>>>>>>>>>>",user)
    if (!user) return res.sendError({ message: "Admin not found!" });
    if (!user.isActive) return res.sendError({ message: "Admin is inactive!" });
    if (user.verifyToken)
      return res.sendError({ message: "Please verify your email to login!" });
      
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      var accessToken = jwtSign({ userId: user._id });
      if (accessToken) {
        await user.update({
          accessToken,
          accessTokenCreatedAt: moment().utc(),
        });
        return res.sendResponse({
         data: { userId: user._id, accessToken: accessToken, isAdmin: true },
          message:"User loggedin successfully!"
        });
      }
    }
    return res.sendError({ message: "Password is not correct!" });
  } catch (err) {
    return res.sendError({ message: err });
  }
};

const verifyEmail = async (req, res) => {
  const { verifyToken } = req.params;
  const skipVerifyTokenExpiry = true;
  try {
    const user = await User.findOne({
      verifyToken,
    });
    if (!user || !user.isActive)
      return res.sendError({
        message: "Invalid User or User already verified!",
      });
    if (
      skipVerifyTokenExpiry ||
      moment(user.verifyTokenCreatedAt).utc().add(5, "minutes") > moment.utc()
    ) {
      await user.update({ verifyTokenCreatedAt: null, verifyToken: null });
      return res.redirect(process.env.CLIENT_DOMAIN);
    } else {
      return res.sendError({ message: "Email verification link is expired!" });
    }
  } catch (err) {
    return res.sendError({ message: err.message });
  }
};

const resendEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const verifyToken = crypto.randomBytes(16).toString("hex");
    const user = await User.findOne({ email });
    if (!user) return res.sendError({ message: "User not exists!" });
    await user.update({
      accessToken: null,
      accessTokenCreatedAt: null,
      verifyToken,
      verifyTokenCreatedAt: moment().utc(),
    });
    sendMail({
      to: email,
      html: `<b>Please verify this url to access Blog ${process.env.SERVER_DOMAIN}/verify-email/${verifyToken}</b>`,
    });
    return res.sendResponse({ data: { userId: user.userId, verifyToken } });
  } catch (err) {
    return res.sendError({ message: err });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) return res.sendError({ message: "User not found!" });
    if (!user.isActive) return res.sendError({ message: "User is inactive!" });
    const forgotPasswordToken = crypto.randomBytes(16).toString("hex");
    await user.update({
      forgotPasswordToken,
      forgotPasswordTokenCreatedAt: moment().utc(),
    });
    sendMail({
      to: user.email,
      html: `<b>Please verify this url to change your password pacehold ${process.env.CLIENT_DOMAIN}/update-password/${forgotPasswordToken}</b>`,
    });
    return res.sendResponse({
      message: "Please check your email to change your password",
      data: {
        userId: user.userId,
        forgotPasswordToken,
        email: user.email,
      },
    });
  } catch (err) {
    return res.sendError({ message: err });
  }
};

const updatePassword = async (req, res) => {
  const { forgotPasswordToken, newPassword } = req.body;
  const skipVerifyTokenExpiry = true;

  try {
    const user = await User.findOne({
      forgotPasswordToken,
    });
    if (!user) return res.sendError({ message: "User not found!" });
    if (!user.isActive) return res.sendError({ message: "User is inactive!" });
    if (
      !skipVerifyTokenExpiry &&
      moment(user.forgotPasswordTokenCreatedAt).utc().add(5, "minutes") <
        moment.utc()
    ) {
      return res.sendError({ message: "Update password link is expired!" });
    }
    const hash = bcrypt.hashSync(newPassword, saltRounds);
    await user.update({
      forgotPasswordToken: null,
      forgotPasswordTokenCreatedAt: null,
      password: hash,
    });
    sendMail({
      to: user.email,
      html: `<b>Your password has been updated successfully</b>`,
    });
    return res.sendResponse({ data: { userId: user.userId }, message:'Your password has been updated successfully' });
  } catch (err) {
    return res.sendError({ message: err });
  }
};

module.exports = {
  login,
  signup,
  verifyEmail,
  resendEmail,
  verifyEmail,
  forgotPassword,
  updatePassword,
  adminLogin,
};
