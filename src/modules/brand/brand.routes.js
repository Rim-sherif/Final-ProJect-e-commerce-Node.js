import express from 'express';
import { addbrand,deletebrand,getAllbrand, getAllbrandById, updatebrand } from './controller/brand.controller.js';
import { validation } from '../../middelware/validation.js';
import { addbrandSchema, getbyidSchema, updatebrandSchema } from './brand.validation.js';
import { uploadSingle } from '../../Utiletis/fileUpload.js';

const brandRoutes = express.Router();


brandRoutes.route("/")
    .post(uploadSingle('image'),validation(addbrandSchema), addbrand)
    .get(getAllbrand)


    brandRoutes.route("/:id")
    .get(validation(getbyidSchema),getAllbrandById)
    .patch(validation(updatebrandSchema),updatebrand)
    .delete(validation(getbyidSchema),deletebrand)








export default brandRoutes;