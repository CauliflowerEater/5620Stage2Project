const loginService = require("../services/userServices/loginService");
const registerService = require("../services/userServices/registerService");
// controllers/transactionController.js
const { getTransactionRecords } = require("../services/userServices/transactionService");
const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    await loginService(userName, password);
    res.status(200).json({ message: "Login Successsful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    await registerService(userName, password, email);
    res.status(200).json({ message: "Account registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { loginUser, registerUser };
