const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type:String,
    Minlength:6
  },
  role:{
    type:String,
    default:"user"
  }
},{timestamps:true});

module.exports = mongoose.model("User",userSchema)
