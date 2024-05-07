import subCategoryModel from "../../../../dataBase/models/subCategory.model.js";
import slugify from "slugify";
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandlers.js";

//add subCategory
const addsubCategory =handelError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    req.body.image = req.file.filename
    let presubCategory = new subCategoryModel(req.body);
    let addedsubCategory = await presubCategory.save()
    res.json({message:"Added",addedsubCategory})
});

//get all subcategories
const getAllsubCategories = handelError(async(req,res)=>{
    let filterObj = {}
    if(req.params.category){
        filterObj.category = req.params.category
    }
    let allsubCategories = await subCategoryModel.find(filterObj)
    res.json({message:"Done",allsubCategories})
});

//get all categoriesby id
const getAllsubCategoriesById =handelError( async(req,res)=>{
    let subCategory = await subCategoryModel.findById(req.params.id);
    res.json({message:"Done",subCategory})
});

//update subCategory
const updatesubCategory = handelError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    let updatedsubCategory = await subCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedsubCategory  && res.json({message:"Done",updatedsubCategory})
    !updatedsubCategory && res.json({message:"not found",updatedsubCategory})
})

//delete subCategory
const deletesubCategory = deleteOne(subCategoryModel)

export { addsubCategory,getAllsubCategories,getAllsubCategoriesById,updatesubCategory,deletesubCategory}