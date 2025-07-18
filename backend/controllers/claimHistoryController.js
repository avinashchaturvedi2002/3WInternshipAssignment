import ClaimHistory from "../models/ClaimHistory.js";
import User from "../models/User.js";

const getClaimHistory=async(req,res)=>{
try{
  const {page,pageSize,userId,userName}=req.query;
  const skip=(page-1)*pageSize;
  let query={};
  if(userName){
    const users=await User.find({name:{$regex:userName,$options:'i'}}).select('_id')
    if(users.length===0)
    {
      return res.json({
        history:[],
        totalClaims:0,
        page,
        pageSize,
        totalPages:0
      })
    }
    const userIds=users.map(user=>user._id);
    query.userId={$in: userIds};
  }
  else if(userId)
  {
    query.userId=userId
  }
  const history= await ClaimHistory.find(query).populate('userId','name').sort({createdAt:-1}).skip(skip).limit(pageSize)

  const totalClaims=await ClaimHistory.countDocuments(query);

  res.json({
    history,
    totalClaims,
    page,
    pageSize,
    totalPages:Math.ceil(totalClaims/pageSize)
  })
}
catch(err)
{
  console.error('Error getting claim history:', err);
    res.status(500).json({ message: 'Server error occurred while fetching claim history.' });
}
}
export {getClaimHistory}