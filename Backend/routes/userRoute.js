const express = require("express")
const userRouter = express.Router()
const {signUp,login,addCategory, getcategory, addsubcategory, getsubcategory, allproduct, getallsubcategory, addproduct} = require("../controller/userController")


userRouter.post("/",signUp)
userRouter.post("/login",login)
userRouter.post("/addcategory",addCategory)
userRouter.get("/getcategory",getcategory)
userRouter.post("/addsubcategory",addsubcategory)
userRouter.get("/getsubcategory/:category",getsubcategory)
userRouter.get("/allproduct",allproduct)
userRouter.get("/getallsubcategory",getallsubcategory)
userRouter.post("/addproduct",addproduct)
 
module.exports = userRouter