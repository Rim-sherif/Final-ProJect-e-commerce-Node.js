import express from 'express';
import * as wichlist from './controller/wishList.controller.js'


const wichListRouter = express.Router();


wichListRouter.patch("/",wichlist.addTowichList)
wichListRouter.delete("/",wichlist.removeFromwichList)








export default wichListRouter;