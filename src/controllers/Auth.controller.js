const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config/config");
const User = require("../models/Users.model.js");

class ClassAuth {
  static async login(email, password) {
    let accountFound = await User.findOne({ email });
    if (!accountFound) throw new Error(`Password or email invalid`);

    const matchPassword = await User.comparePassword(
      password,
      accountFound.password
    );
    if (!matchPassword) throw new Error(`Password or email invalid`);

    const token = jwt.sign({ id: accountFound._id }, SECRET, {
      expiresIn: 86400,
    });

    let response = {
      email: accountFound.email,
      name: accountFound.name,
      role: accountFound.role,
      status: accountFound.status,
      token: token,
    };

    await User.findOneAndUpdate({ email: response.email }, { token: token });
    return {
      status: 200,
      message: "Welcome",
      response,
    };
  }

  static async signUp(data) {
    let accountFound = await User.findOne({ email: data.email });
    if (accountFound) throw new Error(`Email already exist`);

    let newUser = new User({
      ...data,
      password: await User.encryptPassword(data.password),
    });

    await newUser.save();
    newUser.password = undefined;
    return {
      status: 200,
      message: "User registered",
      newUser,
    };
  }
}

module.exports = { ClassAuth };