const userHandler = {};
const User = require('../models/User');
const bcrypt = require('bcrypt');

userHandler.registerUser = async (req, res) => {
  const { email, password } = req.body;
  const newPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username: email,
    password: newPassword,
  });

  try {
    await newUser.save();
    res.json({ message: "User created successfully!", status: 200 });
  } catch (error) {
    res.json({ message: error.message, status: 400 });
  }
}

userHandler.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
}

module.exports = userHandler;