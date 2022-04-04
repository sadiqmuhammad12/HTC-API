const mongoose = require("mongoose");

// const mongoose = require("mongoose"),
//     Schema = mongoose.Schema,
//     autoIncrement = require('mongoose-auto-increment');
//     var connection = mongoose.createConnection("mongodb://localhost/Home_Tutors");

// autoIncrement.initialize(connection);
const UserSchema = new mongoose.Schema(
  {
    // _id: {type: String, required: true},
    username: { type: String , required:true,default: "" },
    email: { type: String, required:true ,default: "" },
    mobile_no: { type: String ,default: "" },
    DOB: { type: String ,default: "" },
    password: { type: String , required:true,default: "" },
    profile_status: { type: String ,default: "" },
    cnic: { type: String ,default: "" },
    gender: { type: String ,default: "" },
    Address: { type: String ,default: "" },
    link: { type: String ,default: "" },
    header: { type: String ,default: "" },
    About_summary: { type: String ,default: "" },
    img: {
      type: String,
    },
    favourits : {type : Array, default : []},
    work_experience: [
      {
        w_title: { type: String, default: "" },
        w_company: { type: String, default: "" },
        w_designation: { type: String, default: "" },
        w_city: { type: String, default: "" },
        w_startdate: { type: String, default: "" },
        w_endDate: { type: String, default: "" },
        continue: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],
    education: [
      {
        education_level: { type: String, default: "" },
        edu_depart: { type: String, default: "" },
        edu_institute: { type: String, default: "" },
        edu_city: { type: String, default: "" },
        edu_startdate: { type: String, default: "" },
        edu_endDate: { type: String, default: "" },
        edu_continue: { type: String, default: "" },
        edu_speciality: { type: String, default: "" },
      },
    ],

    // post_proposal : [
    //   {
    //     post_title: {type : String, default : "",},
    //     post_subject: {type : String, default : "",},
    //     post_depart:{type : String, default : "",},
    //     post_price : {type : String, default : "",},
    //     post_time : {type : String, default : "",},
    //     post_location : {type : String, default : "",},
    //     post_description : {type : String, default : "",},
    //     post_userData : {type : String, default : "",},
    //     post_geoLocation : {type : String, default : "",},
    //     post_createdAt : {type: Date, required: true, default: Date.now },
    //     post_Type : {type : String, default : "",},
    //   },
    // ],
  },
  { timestamps: true }
);

// UserSchema.plugin(autoIncrement.plugin, {
//   model: 'Home-Tutors-Club',
//   field: '_id'
// });

module.exports = mongoose.model("Home-Tutors-Club", UserSchema);
