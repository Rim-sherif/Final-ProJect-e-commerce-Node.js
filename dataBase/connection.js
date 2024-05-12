import  mongoose  from "mongoose";

export function connection(){
  mongoose.connect(process.env.DATA_BASE_ONLINE_URL).then(()=>{
    console.log('connectd to db')
  }).catch((err)=>{
    console.log("error")
  })
}