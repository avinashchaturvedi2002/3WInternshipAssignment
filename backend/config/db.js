import mongoose from "mongoose";

export default async function connectDB(){
try{
  const conn=await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDb Connected");
}
catch(err)
{
  console.error(`Error in connecting mongodb ${err.message}`);
}
}