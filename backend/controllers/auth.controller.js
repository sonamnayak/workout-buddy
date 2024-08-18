const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const createToken = async (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = await createToken(user._id);
    res.status(200).json({ userId: user._id, email, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.register(email, password);
    const token = await createToken(user._id);
    res.status(201).json({ userId: user._id, email, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { login, register };
