import categoryModel from "../../../../dataBase/models/category.model.js";
import slugify from "slugify";
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandlers.js";
import ApiFeatures from "../../../Utiletis/apiFeatures.js";

//add category
const addCategory =handelError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    req.body.image = req.file.filename
    let preCategory = new categoryModel(req.body);
    let addedCategory = await preCategory.save()
    res.json({message:"Added",addedCategory})
});

//get all categories
const getAllCategories = handelError(async(req,res)=>{
    let api = new ApiFeatures (categoryModel.find(),req.query).pagination()
    let allCategories = await api.mogooseQuery;
    res.json({message:"Done",allCategories})
});

//get all categoriesby id
const getAllCategoriesById =handelError( async(req,res)=>{
    let Category = await categoryModel.findById(req.params.id);
    res.json({message:"Done",Category})
});

//update category
const updateCategory = handelError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedCategory  && res.json({message:"Done",updatedCategory})
    !updatedCategory && res.json({message:"not found",updatedCategory})
})

//delete category
const deleteCategory = deleteOne(categoryModel)


export { addCategory,getAllCategories,getAllCategoriesById,updateCategory,deleteCategory}