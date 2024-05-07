import mongoose, { Schema } from "mongoose";

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
    image: String,
    createedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

schema.post("init",function(doc){
  doc.image = process.env.BASEURL+"uploads/"+ doc.image
})

const brandModel = mongoose.model("brand", schema);

export default brandModel;
