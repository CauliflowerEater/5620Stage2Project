const User = require("../../models/User");

const Login = async (userName, password) => {
  try {
    let user = await User.findOne({ userName });
    if (!user) {
      throw new Error("userName doesn't exist");
    }
    //比较密码
    if (!(password === user.password)) {
      throw new Error("Invalid password.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = Login;
