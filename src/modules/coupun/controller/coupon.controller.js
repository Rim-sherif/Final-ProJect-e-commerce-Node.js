import cuponModel from "../../../../dataBase/models/coupon.model.js";
import { AppError } from "../../../Utiletis/AppError.js";
import ApiFeatures from "../../../Utiletis/apiFeatures.js";
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandlers.js";
import QRCode from "qrcode"


//add coupon
const addcoupon = handelError(async (req, res, next) => {
  let result = new cuponModel(req.body);
  let addedcoupon = await result.save();
  res.json({ message: "Added", addedcoupon });
});

//get all coupon
const getAllcoupon = handelError(async (req, res) => {
  let apifeatures = new ApiFeatures(cuponModel.find(), req.query)
    .pagination()
    .sort()
    .search()
    .fields();
  let allcoupon = await apifeatures.mongooseQuery;

  res.json({ message: "Done", allcoupon });
});

//get all couponby id
const getAllcouponById = handelError(async (req, res) => {
  let coupon = await cuponModel.findById(req.params.id);
  let url = await QRCode.toDataURL(coupon.code)
  res.json({ message: "Done", coupon  , url });
});

//update coupon
const updatecoupon = handelError(async (req, res, next) => {
  let { id } = req.params;
  let updatedcoupon = await cuponModel.findByIdAndUpdate({ _id: id},req.body,{ new: true });

  updatedcoupon && res.json({ message: "Done", updatedcoupon});
  !updatedcoupon && res.json({ message: "not found", updatedcoupon });
});

//delete coupon
const deletecoupon = deleteOne(cuponModel);

export {
  addcoupon,
  getAllcoupon,
  getAllcouponById,
  updatecoupon,
  deletecoupon,
};
