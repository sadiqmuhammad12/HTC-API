const User = require("../model/userModel");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const user = require("../model/userModel");
// const fileupload = require("express-fileupload");
// router.use(fileupload());
//REGISTER

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    mobile_no: req.body.mobile_no,
    DOB: req.body.DOB,
    profile_status: req.body.profile_status,
    cnic: req.body.cnic,
    gender: req.body.gender,
    Address: req.body.Address,
    link: req.body.link,
    header: req.body.header,
    About_summary: req.body.About_summary,
    work_experience: req.body.work_experience,
    education: req.body.education,
    post_proposal: req.body.post_proposal,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  const userExist = await User.findOne({ email: req.body.email });

  if (userExist) {
    var addMessage2 = { Result: "User exist" };
    console.log(userExist);
    return res.status(201).json({ Result: "User already exist in this email" });
  }
  try {
    const user = await newUser.save();
    var addMessage1 = { Result: "Registration success" };
    res.status(200).json({ Result: "user register successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong password or username!");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or username!");

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "90d",
    });

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});


//Read data from user table

router.get("/find/:_id", async (req, res) => {
  try {
    const user = await User.find({ _id: req.params._id });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// User Profile Registration
router.put("/AddUser_Info/:_id", async (req, res) => {
  try {
   const updateData = await User.findByIdAndUpdate({_id:req.params._id},{
    $set: req.body
   },
   {new: true})
    res.status(200).json(updateData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// User work experience and education
router.put("/work_experience_education/:_id", async (req, res) => {

  try {
   const updateData = await User.findOneAndUpdate({_id:req.params._id},
    { $push: {work_experience : req.body.work_experience, education : req.body.education},},
   {new: true})

    res.status(200).json(updateData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete a user
router.delete("/delete_user/:_id",async (req,res) => {
  try{
     const delete_user = await user.findById(req.params._id);
     if(delete_user._id)
     {
       await delete_user.deleteOne();
       res.status(200).json(" Education has been deleted");
     }
     else{
        res.status(500).json("You can delete only user Education");
     }
  }
  catch(err){ 
      res.status(500).json(err);

  }
})

// router.post('/upload', (req,res) => {
//   const file = req.files.photo;
//   file.mv("./uploads/" +file.name, function(err,result){
//     if(err)
//         throw err;
//       res.send({
//           success : true,
//           message : "File Upload"
//         });
//   })
// })
module.exports = router;
