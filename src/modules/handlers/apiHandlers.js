import { handelError } from "../../middelware/handelError.js";



export const deleteOne = (model) => {
    return handelError(async(req,res) =>{
        let deleted = await model.findByIdAndDelete(req.params.id,req.body,{new:true});
        deleted  && res.json({message:"Delete",deleted})
        !deleted && res.json({message:"not found",deleted})
    })
    
}