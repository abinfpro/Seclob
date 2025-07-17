const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    category: { 
        type: String, 
        required: true, 
        trim: true },
    subcategory: { 
        type: String, 
        required: true, 
        trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SubCategory', subCategorySchema);
