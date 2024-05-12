import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems:[{
      product:{
       type:mongoose.Types.ObjectId,
       ref:"product"
      },
   quantity:{
     type:Number,
     default:1
   },
   price:Number
   }],
    totalPrice: {
      type: Number,
      required: true,
    },
    discount:Number,
    totalPriceAfterDiscount:Number,
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "debit_card", "paypal", "cash_on_delivery"],
      default:"cash_on_delivery",
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidDate: {
      type: Date,
    },
    shippingAddress: {
      type: String,
      
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;

