// import jwt from "jsonwebtoken";
const jwt = require('jsonwebtoken');

 const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      // isAdmin: user.isAdmin,
    },
    "somethingsecret",
    {
      expiresIn: "120s",
    }
  );
};
