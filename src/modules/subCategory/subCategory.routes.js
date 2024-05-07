import express from 'express';
import { addsubCategory,deletesubCategory,getAllsubCategories, getAllsubCategoriesById, updatesubCategory } from './controller/subCategory.controller.js';
import { validation } from '../../middelware/validation.js';
import { addsubCatgeorySchema, getbyidSchema, updatesubCategorySchema } from './subCategory.validation.js';
import { uploadSingle } from '../../Utiletis/fileUpload.js';

const subCategoryRoutes = express.Router({mergeParams:true});


subCategoryRoutes.route("/")
    .post(uploadSingle('image'),validation(addsubCatgeorySchema), addsubCategory)
    .get(getAllsubCategories)


    subCategoryRoutes.route("/:id")
    .get(validation(getbyidSchema),getAllsubCategoriesById)
    .patch(validation(updatesubCategorySchema),updatesubCategory)
    .delete(validation(getbyidSchema),deletesubCategory)








export default subCategoryRoutes;