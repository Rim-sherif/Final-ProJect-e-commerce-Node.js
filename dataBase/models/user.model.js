import mongoose from "mongoose";

import bcrypt from "bcrypt"



const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email:{
       type:String,
       required:true,
       unique:true 
    },
    profilePicture:String,
    changePasswordAt:Date,
    phone:String,
    role:{
        type:String,
        enums:["Admin","User"],
        default:"User"
    },
    password:{
        type:String,
        required:true
    },
    wishList:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"product"
    }],
    address:[{
      city:String,
      street:String,
      phone:String
    }],
    isActive:{
        type:Boolean,
        default:true
    },
    isBlocked:{
        type:Boolean,
        default:true
    },
    isVerfied:{
        type:Boolean,
        default:false
    }


  },
  {
    timestamps: true,
  }
);

schema.pre("save",function(){
  console.log(this);
  this.password = bcrypt.hashSync(this.password,7)
})

schema.pre("findOneAndUpdate",function(){
  console.log(this);
  this._update.password = bcrypt.hashSync(this._update.password,7)
})



const UserModel = mongoose.model("User", schema);

export default UserModel;