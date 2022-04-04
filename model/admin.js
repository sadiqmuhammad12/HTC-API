const mongoose = require("mongoose");

// const mongoose = require("mongoose"),
//     Schema = mongoose.Schema,
//     autoIncrement = require('mongoose-auto-increment');
//     var connection = mongoose.createConnection("mongodb://localhost/Home_Tutors");

// autoIncrement.initialize(connection);
const UserSchema = new mongoose.Schema(
  {
    // _id: {type: String, required: true},
    username: { type: String , default: "" },
    email: { type: String ,  default: "" },
    password: { type: String , default: "" },
  },
  { timestamps: true }
);

// UserSchema.plugin(autoIncrement.plugin, {
//   model: 'Home-Tutors-Club',
//   field: '_id'
// });

module.exports = mongoose.model("admin", UserSchema);
