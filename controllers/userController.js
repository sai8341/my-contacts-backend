const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (request, response) => {
  const { username, email, password } = request.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const isUserAvailable = await User.findOne({ email });

  if (isUserAvailable) {
    response.status(400);
    throw new Error("User already Registered");
  }

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    response.status(201).json({ _id: newUser.id, email: newUser.email });
  } else {
    throw new Error("User is not valid");
  }

  response.send({ message: "Register the user" });
});

const loginUser = asyncHandler(async (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    response.status(400);
    throw new Error("All Fields are Mandatory!");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({ user: { username: user.username, password: user.password } }, process.env.MY_SECRET_TOKEN);
    response.status(200).json({ accessToken });
  } else {
    response.status(400)
    throw new Error("Email or Password or Not Valid")
  }
});

const currentUser = asyncHandler(async (request, response) => {
  response.send(request.user);
});

module.exports = { registerUser, loginUser, currentUser };
