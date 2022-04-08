const admin = require("../model/admin");
const express = require("express");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
//REGISTER
router.post("/admin_register", async (req, res) => {
    const newUser = new admin({  
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });
  
    const userExist = await admin.findOne({ email: req.body.email });
  
    if (userExist) {
      var addMessage2 = { Result: "User exist" };
      // console.log(userExist);
      return res.status(201).json({ Result: "User already exist in this email" });
    }
    
    try {
      const user = await newUser.save();
      var addMessage1 = { Result: "Registration success" };
      res.status(200).json({ Result: "user register successfully"});
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // //LOGIN
  router.post("/admin_login", async (req, res) => {
    try {
      const user = await admin.findOne({ email: req.body.email });
      !user && res.status(401).json("Wrong password or username!");
  
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  
      originalPassword !== req.body.password &&
        res.status(401).json("Wrong password or username!");
  
      const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "90d",
      });
  
      const { password, ...info } = user._doc;
  
     return res.status(200).json({ ...info, accessToken });
    } catch (err) {
     return res.status(500).json(err);
    }
  });
  module.exports = router;