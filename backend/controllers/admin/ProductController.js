const ErrorHandler = require("../../ulits/errorHandler");

const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const slugify = require("slugify");
const Product = require("../../models/product");
const shortid = require("shortid");

/*
| get all products
| /api/v1/admin/products/index
*/
exports.index = catchAsyncErrors(async (req, res) => {
  Product.find({}).exec((error, products) => {
    if (error) return res.status(400).json({ error });
    if (products) {
      return res.status(200).json({ products });
    }
  });
});

/*
| Create a product
| /api/v1/admin/products/create
*/
exports.create = (req, res) => {
  const { name, price, quantity, description, category, createdBy } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const createProduct = new Product({
    name,
    slug: slugify(name),
    price,
    category,
    quantity,
    description,
    productPictures,

    createdBy: req.user._id,
  });
  createProduct.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) return res.status(200).json(createProduct);
  });
};
