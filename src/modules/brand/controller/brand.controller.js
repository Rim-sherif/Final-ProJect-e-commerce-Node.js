import brandModel from "../../../../dataBase/models/brand.model.js";
import slugify from "slugify";
import { handelError } from "../../../middelware/handelError.js";
import { deleteOne } from "../../handlers/apiHandlers.js";

//add brand
const addbrand =handelError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    req.body.image = req.file.filename
    let prebrand = new brandModel(req.body);
    let addedbrand = await prebrand.save()
    res.json({message:"Added",addedbrand})
});

//get all brand
const getAllbrand = handelError(async(req,res)=>{
    let allbrand = await brandModel.find()
    res.json({message:"Done",allbrand})
});

//get all brandby id
const getAllbrandById =handelError( async(req,res)=>{
    let brand = await brandModel.findById(req.params.id);
    res.json({message:"Done",brand})
});

//update brand
const updatebrand = handelError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    if(req.file) req.body.logo = req.file.filename
    let updatedbrand = await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedbrand  && res.json({message:"Done",updatedbrand})
    !updatedbrand && res.json({message:"not found",updatedbrand})
})

//delete brand
const deletebrand = deleteOne(brandModel)

export { addbrand,getAllbrand,getAllbrandById,updatebrand,deletebrand}