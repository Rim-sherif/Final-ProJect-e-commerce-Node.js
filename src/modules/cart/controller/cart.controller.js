import cartModel from "../../../../dataBase/models/cart.model.js";
import cuponModel from "../../../../dataBase/models/coupon.model.js";
import productsModel from "../../../../dataBase/models/products.model.js";
import { AppError } from "../../../Utiletis/AppError.js";
import { handelError } from "../../../middelware/handelError.js";




function calcPrice(cart){
  let totalPrice = 0;
  cart.cartItems.forEach((ele)=>{
   totalPrice += ele.quantity*ele.price
  })

  cart.totalPrice = totalPrice;
}




//add to cart
const addToCart = handelError(async (req, res, next) => {

  let product =  await productsModel.findById(req.body.product).select("price")
  !product && next(new AppError("product not found",404))
  
  req.body.price = product.price
  let isCartExist = await cartModel.findOne({
    user: req.user._id.toString()
  });
  if (!isCartExist){
    let cart = new cartModel({
      user:req.user._id,
      cartItems:[req.body]
    })
    calcPrice(cart)
    await cart.save()
    return res.status(201).json({ message: "Added", cart });
  }

  let item = isCartExist.cartItems.find((ele) => ele.product == req.body.product)
  if(item){
    item.quantity +=1 
  }else{
    isCartExist.cartItems.push(req.body)
  }

  calcPrice(isCartExist)
  await isCartExist.save()
  res.json({ message: "Ay7aga",isCartExist });
});

//get cart
const getCart = handelError(async (req, res, next) => {
  let cart = await cartModel.findOne({user:req.user._id})
  res.json({ message: "Done",cart });
})

//deleteCartItem
const deleteCartItem =  handelError(async (req, res, next) => {
  let cart = await cartModel.findOneAndUpdate({user:req.user._id.toString()},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
  console.log(cart)
  res.json({ message: "deleted",cart });
})



//update cart
const updatecart  = handelError(async (req, res, next) => {

  let product =  await productsModel.findById(req.body.product).select("price")
  !product && next(new AppError("product not found",404))
  
  req.body.price = product.price
  let isCartExist = await cartModel.findOne({
    user: req.user._id
  });

  let item = isCartExist.cartItems.find((ele) => ele.product == req.body.product)
   !item && next(new AppError("item not founded",404))
  if(item){
    item.quantity = req.body.quantity
  }

  calcPrice(isCartExist)
  await isCartExist.save()
  res.json({ message: "Done",isCartExist });
});


const applyCoupon = handelError(async (req, res, next) => {
  let code = await cuponModel.findOne({code: req.params.code})
  let cart = await cartModel.findOne({user: req.user._id})
  cart.totalPriceAfterDiscount = cart.totalPrice -(cart.totalPrice * code.discount) / 100;
  cart.discount = code.discount
  await cart.save()
  res.json({ message: "Done",cart});
})

export {
  addToCart,
  getCart,deleteCartItem,updatecart,applyCoupon
};
