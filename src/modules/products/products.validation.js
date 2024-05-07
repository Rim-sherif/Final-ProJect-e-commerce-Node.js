import Joi from "joi";

export const addproductSchema = Joi.object({
  title: Joi.string().min(3).max(30).required().trim(),
  description: Joi.string().min(3).max(300).required(),
  price: Joi.number().min(0).required(),
  priceAfterDiscount: Joi.number().min(0).required(),
  quantatiy: Joi.number().min(0).required(),
  category: Joi.string().hex().length(24).required(),
  subcategory: Joi.string().hex().length(24).required(),
  brand: Joi.string().hex().length(24).required(),
  createdBy: Joi.string().hex().length(24).optional(),
  imageCover:Joi.array().items(Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/jpg")
      .required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(52428800).required(),
  }).required()).required(),
  images:Joi.array().items(Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/jpg")
      .required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(52428800).required(),
  }).required()).required()
});

export const getbyidSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateproductSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  title: Joi.string().min(3).max(20).required(),
});





/* logo: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/jpg")
      .required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5242880).required(),
  }).required(), */