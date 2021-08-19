const ErrorHandler = require("../../ulits/errorHandler");

const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const slugify = require("slugify");
const Category = require("../../models/category");

/**
 * Get parent chield category list
 * */
function getParentChieldList(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parent_id: cate.parentId,
      chieldren: getParentChieldList(categories, cate._id),
    });
  }
  return categoryList;
}

/*
| get all categories
| /api/v1/admin/categories/index
*/
exports.index = async (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoriesList = getParentChieldList(categories);
      return res.status(200).json({ categoriesList });
    }
  });
};

/*
| Create a category
| /api/v1/admin/categories/create
*/
exports.create = catchAsyncErrors(async (req, res) => {
  const { name } = req.body;
  console.log("get success");
  const categoryObj = {
    name,
    slug: slugify(name),
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  if (req.file) {
    categoryObj.categoryImage = req.file.filename;
  }

  const cat = new Category(categoryObj);

  cat.save((error, category) => {
    if (error) res.status(400).json({ error });
    if (category) {
      return res.status(200).json({
        success: true,
        message: "Category has been created successfully",
        category,
      });
    }
  });
});
