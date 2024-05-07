import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [3, " title is too short"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    image:String,
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const subcategoryModel = mongoose.model("subCategory", schema);

export default subcategoryModel;
