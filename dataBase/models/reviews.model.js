import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true,"review is required"],
      trim: true,
      unique: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
      rating: {
        type: Number,
        min: 1,
        max: 5, 
      },
  },
  {
    timestamps: true,
  }
);

schema.pre(/^find/,function(){
  this.populate('user','name');
})

const reviewModel = mongoose.model("review", schema);

export default reviewModel;
