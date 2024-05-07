import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    code: {
      type:String,
      required: true,
      trim: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    discount:{
        type:Number,
        min:0
    },
    expires:String, 
    product: {
        type: mongoose.Types.ObjectId,
        ref: "product",
      }
  },
  {
    timestamps: true,
  }
);

const cuponModel = mongoose.model("cupon", schema);

export default cuponModel;