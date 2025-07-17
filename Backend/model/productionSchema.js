
const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  ram: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    variants: { type: [variantSchema], required: true },
     subCategory: { type: String},
    description: { type: String },
    image:{type: String},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User',  },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
