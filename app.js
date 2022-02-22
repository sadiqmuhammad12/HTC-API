const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userAuth = require("./controller/userManipulation");
const port = process.env.PORT || 8800;
var cors = require("cors");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });
app.use(cors());
app.use(express.json());

app.use("/api/userAuth", userAuth);

app.listen(port, () => {
  console.log("Backend server is running on", port);
});
