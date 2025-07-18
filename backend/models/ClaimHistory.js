import mongoose from "mongoose";
const claimHistorySchema=new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},
pointsClaimed:{type:Number,required:true},
},{timestamps:true});

export default mongoose.model("ClaimHistory",claimHistorySchema);