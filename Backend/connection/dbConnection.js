require("dotenv").config();
const monsooge = require("mongoose");

const DB = async () => {
  try {
    await monsooge.connect(process.env.dbUrl);
    console.log("DB Connected Sucessfully");
  } catch (error) {
    console.error("Connection failed");
  }
};

module.exports = DB;
