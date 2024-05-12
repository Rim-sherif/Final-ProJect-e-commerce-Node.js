import express from 'express';
import { creatCascheOrder, getAllOrder, getOrder, onlinePayment } from './controller/order.controller.js';
import { protectRoutes } from '../auth/auth.controller.js';

const orderRoutes = express.Router();


orderRoutes.route("/:id")
    .post(protectRoutes,creatCascheOrder)

orderRoutes.route("/checkout/:id")
    .post(protectRoutes,onlinePayment)

orderRoutes.route("/").get(protectRoutes,getOrder)
   
orderRoutes.route("/all").get(protectRoutes,getAllOrder)
   

export default orderRoutes;