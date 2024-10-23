const User = require("../../models/User");

const register = async (userName, password, email) => {
  try {
    let Cuser = await User.findOne({ userName });
    let Cemail = await User.findOne({ email });
    if (Cuser) {
      throw new Error("userName is used");
    }
    if (Cemail) {
      throw new Error("Email address exists");
    }
    //创建新用户对象
    user = new User({
      userName: userName,
      password: password,
      email: email,
    });
    //保存新用户
    await user.save();
  } catch (error) {
    throw new Error("Server Error: " + error.message);
  }
};

module.exports = register;
