import express from 'express';
import * as userconrollor from './controller/user.controller.js';



const userRoutes = express.Router();


userRoutes.route("/").get(userconrollor.getAlluser).post(userconrollor.adduser)


    userRoutes.route("/:id")
    .get(userconrollor.getAlluserById)
    .patch(userconrollor.updateuser)
    .delete(userconrollor.deleteuser)


    userRoutes.put("/changepassword/:id",userconrollor.changepassword)








export default userRoutes;