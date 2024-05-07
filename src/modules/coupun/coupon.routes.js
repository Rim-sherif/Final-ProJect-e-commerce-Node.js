import express from 'express';
import { addcoupon, deletecoupon, getAllcoupon, getAllcouponById, updatecoupon } from './controller/coupon.controller.js';
import { protectRoutes } from '../auth/auth.controller.js';


const couponRouter = express.Router();


couponRouter.route("/")
    .post(protectRoutes,addcoupon)
    .get(getAllcoupon)


couponRouter.route("/:id")
    .get(getAllcouponById)
    .patch(updatecoupon)
    .delete(deletecoupon)








export default couponRouter;