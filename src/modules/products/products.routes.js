import express from "express";
import {
  addproduct,
  deleteproduct,
  getAllproduct,
  getAllproductById,
  updateproduct,
} from "./controller/products.controller.js";
import { validation } from "../../middelware/validation.js";
import {
  addproductSchema,
  getbyidSchema,
  updateproductSchema,
} from "./products.validation.js";
import { uploadFileds } from "../../Utiletis/fileUpload.js";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";

const productRoutes = express.Router();

productRoutes
  .route("/")
  .get(getAllproduct)
  .post(
    protectRoutes,
    allowTo("Admin","User"),
    uploadFileds([{ name: "imageCover", maxCount: 1 },{ name: "images", maxCount: 10 },]),
    validation(addproductSchema),
    addproduct
  )


productRoutes
  .route("/:id")
  .get(validation(getbyidSchema), getAllproductById)
  .patch(
    uploadFileds([
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(addproductSchema),
    validation(updateproductSchema),
    updateproduct
  )
  .delete(validation(getbyidSchema), deleteproduct);

export default productRoutes;
