import productsModel from "../../../../dataBase/models/products.model.js";
import slugify from "slugify";
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandlers.js";
import ApiFeatures from "../../../Utiletis/apiFeatures.js";

//add product
const addproduct = handelError(async (req, res) => {
  console.log(req.files);
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((ele) => ele.filename);
  let preproduct = new productsModel(req.body);
  let addedproduct = await preproduct.save();
  res.status(201).json({ message: "Added", addedproduct });
});

//get all product
const getAllproduct = handelError(async (req, res) => {
  let api = new ApiFeatures (productsModel.find(),req.query)
   let allproduct = await productsModel.find()
  res.json({ message: "Done", allproduct });
});

//get all productby id
const getAllproductById = handelError(async (req, res) => {
  let product = await productsModel.findById(req.params.id);
  res.json({ message: "Done", product });
});

//update product
const updateproduct = handelError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  if (req.files.imageCover)
    req.body.imageCover = req.files.imageCover[0].filename;
  if (req.files.images)
    req.body.images = req.files.images.map((ele) => ele.filename);
  let updatedproduct = await productsModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  updatedproduct && res.json({ message: "Done", updatedproduct });
  !updatedproduct && res.json({ message: "not found", updatedproduct });
});

//delete product
const deleteproduct = deleteOne(productsModel);

export {
  addproduct,
  getAllproduct,
  getAllproductById,
  updateproduct,
  deleteproduct,
};
