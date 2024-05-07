import userModel from "../../../../dataBase/models/user.model.js";
import slugify from "slugify";
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandlers.js";
import { AppError } from "../../../Utiletis/AppError.js";

//add user
const adduser =handelError(async(req,res,next) =>{
let user = await userModel.findOne({email:req.body.email})
if(user) return next(new AppError("dublicate email",409))
    let preuser = new userModel(req.body);
    let addeduser = await preuser.save()
    res.json({message:"Added",addeduser})
});

//get all user
const getAlluser = handelError(async(req,res)=>{
    let alluser = await userModel.find()
    res.json({message:"Done",alluser})
});

//get all userby id
const getAlluserById =handelError( async(req,res)=>{
    let user = await userModel.findById(req.params.id);
    res.json({message:"Done",user})
});

//update user
const updateuser = handelError(async(req,res) =>{
   
    let updateduser = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updateduser  && res.json({message:"Done",updateduser})
    !updateduser && res.json({message:"not found",updateduser})
})

//delete user
const deleteuser = deleteOne(userModel)

// change password
const changepassword = handelError(async(req,res) =>{
    let {id} = req.params
    req.body.changePasswordAt = Date.now();
    let passwordchanged = await userModel.findOneAndUpdate({_id:id},req.body,{new:true});
    passwordchanged  && res.json({message:"Done",passwordchanged})
    !passwordchanged && res.json({message:"not found",passwordchanged})
})

export {
    adduser,
    getAlluser,
    getAlluserById,
    updateuser,
    deleteuser,
    changepassword
}