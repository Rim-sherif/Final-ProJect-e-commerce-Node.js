import cartModel from "../../../../dataBase/models/cart.model.js";
import OrderModel from "../../../../dataBase/models/order.model.js";
import productsModel from "../../../../dataBase/models/products.model.js";
import { AppError } from "../../../Utiletis/AppError.js";
import { handelError } from "../../../middelware/handelError.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PFgPvIeqeNz5cDNwb1nJ6uyTJspEsnpMSvn50q5MUHPkCmmNv7yaSnzNVkmIKUQkw2CUCJvrvd1QHVsPiLqjMVG00EXRmwkPC');


//createOrder
const creatCascheOrder = handelError(async(req,res,next) =>{
    
    let cart = await cartModel.findById(req.params.id)
    let totalOrderPrice =  cart.totalPriceAfterDiscount? cart.totalPriceAfterDiscount : cart.totalPrice
    
    let order = await OrderModel({
        user : req.user._id,
        cartItems : cart.cartItems,
        totalOrderPrice,
        shippingAddress :req.body.shippingAddress ,

    })

    if(order) {
        let options = cart.cartItems.map((item) =>({
            updateOne:{
                filter: {_id :item.product},
                update:{$in:{quantity:-item.quantity,sold:item.quantity}}
            }
        }))

        await productsModel.bulkWrite(options)
        await order.save()
    }else{
        return next(new AppError("error occur",409))
    }
    
    await cartModel.findByIdAndDelete(req.params.id);
    
    res.json({message:"Done",order})
});


// get order
const getOrder = handelError(async(req,res,next) =>{
    let order =  await OrderModel.findOne({user:req.user._id}).populate("cartItems.product")
    res.json({message:"Done",order})
})

// get all Orders
const getAllOrder = handelError(async(req,res,next) =>{
    let order =  await OrderModel.find({user:req.user._id})
    res.json({message:"Done",order})
})

// onlinePayment

const onlinePayment = handelError(async(req,res,next) =>{
    let cart = await cartModel.findById(req.params.id)
    let totalOrderPrice =  cart.totalPriceAfterDiscount? cart.totalPriceAfterDiscount : cart.totalPrice
    
    let session = await stripe.checkout.sessions.create({
        line_items :[
            {
                price_data:{
                    currency:"egp",
                    unit_amount: totalOrderPrice * 100,
                    product_data:{
                        name : req.user.name,
                    }
                },
                quantity:1

            }
        ],
        mode :"payment",
        success_url:"https://route-comm.netlify.app/#/",
        cancel_url:"https://route-comm.netlify.app/#/app",
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddress
    })
    res.json({message:"Done",session})
})


export { creatCascheOrder , getOrder , getAllOrder , onlinePayment }