import express from 'express';
import { addreview,deletereview,getAllreview, getAllreviewById, updatereview } from './controller/review.controller.js';
import { protectRoutes } from '../auth/auth.controller.js';


const reviewRouter = express.Router();


reviewRouter.route("/")
    .post(protectRoutes,addreview)
    .get(getAllreview)


    reviewRouter.route("/:id")
    .get(getAllreviewById)
    .patch(updatereview)
    .delete(deletereview)








export default reviewRouter;