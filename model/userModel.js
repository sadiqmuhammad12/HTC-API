
const mongoose = require("mongoose"),
    //Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
    var connection = mongoose.createConnection("mongodb://localhost/Home_Tutors");
 
autoIncrement.initialize(connection);
const UserSchema = new mongoose.Schema(
  {
    _id: {type: String, required: true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile_no: { type: String},
    DOB: { type: String},
    password: { type: String, required: true },
    profile_status: { type: String},
    cnic: { type: String },
    gender: { type: String },
    Address: { type: String },
    link: { type: String },
    header: { type: String},
    About_summary: { type: String },
    work_experience: [
      {
        w_title : String, 
        w_company: String, 
        w_designation: String,
        w_city:String, 
        w_startdate : String,
        w_endDate : String, 
        continue : String, 
        description : String
      }
    ],
    education : [
      {
        education_level : String, 
        edu_depart: String, 
        edu_institute: String, 
        edu_city:String, 
        edu_startdate : String,
        edu_endDate : String, 
        edu_continue : String, 
        edu_speciality : String
      }
    ],
    post_proposal: { type: String },
  },
  { timestamps: true }
);


UserSchema.plugin(autoIncrement.plugin, {
  model: 'Home-Tutors-Club',
  field: '_id'
});

module.exports = mongoose.model("Home-Tutors-Club", UserSchema);

