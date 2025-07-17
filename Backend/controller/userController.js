require("dotenv").config();
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const User = require("../model/userSchema");
const Category = require("../model/categorySchema");
const SubCategory = require("../model/subCategorySchema");
const productionSchema = require("../model/productionSchema");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashedpassword = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: hashedpassword });
    }
    res.status(200).json({ message: "sucessfully user created" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (existingUser && isMatch)
      return res.status(200).json({ message: "loggin successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name });
    if (!existingCategory) {
      const respo = await Category.create({ name: name });
      return res.status(201).json({ message: "Category created", data: respo });
    } else {
      return res
        .status(200)
        .json({ message: "Category already exists", data: existingCategory });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
const getcategory = async (req, res) => {
  try {
    const response = await Category.find();
    res.status(200).json(response);
  } catch (error) {}
};
const addsubcategory = async (req, res) => {
  try {
    const { selectCat, subCatValue } = req.body;
    const response = await SubCategory.create({
      category: selectCat,
      subcategory: subCatValue,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
const getsubcategory = async (req, res) => {
  try {
    const { category } = req.params;
    const response = await SubCategory.find({
      category: { $regex: category, $options: "i" },
    });
    res.status(200).json(response);
  } catch (error) {}
};
const getallsubcategory = async (req, res) => {
  try {
    const response = await SubCategory.find();
    res.status(200).json(response);
  } catch (error) {}
};
const allproduct = async (req, res) => {
  try {
    const response = await productionSchema.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const addproduct = async (req, res) => {
  try {
    const { selectSub, variant, image } = req.body;
    const { title, description } = req.body.data;

    let imageName = null;
    if (image) {
      const matches = image.match(/^data:(.+);base64,(.+)$/);
      if (!matches)
        return res.status(400).json({ message: "Invalid image format" });

      const ext = matches[1].split("/")[1];
      const data = matches[2];
      imageName = `product_${Date.now()}.${ext}`;

      const filepath = path.join(__dirname, "../public/uploads", imageName);

      fs.writeFileSync(filepath, Buffer.from(data, "base64"));
    }

    const response = await productionSchema.create({
      name: title,
      variants: variant,
      subCategory: selectSub,
      description,
      image: imageName,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signUp,
  login,
  addCategory,
  getcategory,
  addsubcategory,
  getsubcategory,
  allproduct,
  getallsubcategory,
  addproduct,
};
