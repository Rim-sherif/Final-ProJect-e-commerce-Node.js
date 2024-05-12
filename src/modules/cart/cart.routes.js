import express from 'express';
import { protectRoutes } from '../auth/auth.controller.js';
import { addToCart, applyCoupon, deleteCartItem, getCart, updatecart } from './controller/cart.controller.js';



const cartRouter = express.Router();


cartRouter.route("/")
    .post(protectRoutes,addToCart)
    .get(protectRoutes,getCart)
    .patch(protectRoutes,updatecart)


cartRouter.route("/:id")
    .post(protectRoutes,applyCoupon)
    .delete(protectRoutes,deleteCartItem)

    







export default cartRouter;