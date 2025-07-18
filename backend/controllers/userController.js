import ClaimHistory from "../models/ClaimHistory.js";
import User from "../models/User.js";

const addUser=async(req,res)=>{
  try{
    const {name}=req.validatedData;
    const newUser=new User({
      name,
      totalPoints:0
    }) 
    await newUser.save();
    res.status(201).json({
      message:"New User Created Successfully!",
      user:newUser
    })
  }
    catch(err){
      console.error("Error creating User: ",err)
      res.status(500).json({
        message:'Server error during creation of user!'
      })
    }

  
}

const claimPoints=async(req,res)=>{
  try{
    const {userId}=req.validatedData
    const points=Math.floor(Math.random()*10)+1
    const user=await User.findByIdAndUpdate(userId,
      {$inc:{totalPoints:points}},{
        new:true
      }
    )
    if(!user)
    {
      return res.status(404).json({message:"User not found"})
    }
    const newClaim= new ClaimHistory({
      userId:userId,
      pointsClaimed:points
    })
    await newClaim.save();

    res.json({ message:'Successfully claimed points',points:points,user:user,claim:newClaim})
  }
  catch(err)
  {
    console.error('Error claiming points:', err);
    res.status(500).json({ message: 'Server error occurred while claiming points.' });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const pageNum = parseInt(page);
    const size = parseInt(pageSize);
    const skip = (pageNum - 1) * size;

    const users = await User.find({})
      .sort({ totalPoints: -1 })
      .skip(skip)
      .limit(size);

    const totalCount = await User.countDocuments();
    const hasMore = skip + users.length < totalCount;

    res.status(200).json({ users, hasMore });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {addUser,claimPoints,getAllUsers}