const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, trim: true },
    slug: { type: String, require: true, unique: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Category",
    },
    price: { type: Number, require: true },
    quantity: { type: Number, require: true },
    description: { type: String, require: true, trim: true },
    offer: { type: Number },
    productPictures: [{ img: { type: String } }],
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        review: String,
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
