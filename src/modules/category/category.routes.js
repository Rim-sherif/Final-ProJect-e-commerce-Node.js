import express from 'express';
import { addCategory,deleteCategory,getAllCategories, getAllCategoriesById, updateCategory } from './controller/category.controller.js';
import { validation } from '../../middelware/validation.js';
import { addCatgeorySchema, getbyidSchema, updateCategorySchema } from './category.validation.js';
import { uploadSingle } from '../../Utiletis/fileUpload.js';
import subCategoryRoutes from '../subCategory/subCategory.routes.js';

const categoryRoutes = express.Router();

categoryRoutes.use("/:category/subcategory",subCategoryRoutes)
categoryRoutes.route("/")
    .post(uploadSingle('image'),validation(addCatgeorySchema), addCategory)
    .get(getAllCategories)


    categoryRoutes.route("/:id")
    .get(validation(getbyidSchema),getAllCategoriesById)
    .patch(validation(updateCategorySchema),updateCategory)
    .delete(validation(getbyidSchema),deleteCategory)








export default categoryRoutes;