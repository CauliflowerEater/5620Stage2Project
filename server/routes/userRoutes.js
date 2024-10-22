const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/userController");

router.post("/users/register", registerUser);

router.post("/users/login", loginUser);

module.exports = router;
