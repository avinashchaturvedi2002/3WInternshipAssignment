import {createUserSchema,claimPointSchema,paginationSchema} from "../validation/validationSchemas.js"
const validate=(schema)=>(req,res,next)=>{
  try{
    const dataToValidate=req.method==='GET'?req.query:req.body
    req.validatedData=schema.parse(dataToValidate);
    next();
  }
  catch(err)
  {
    console.log(err);
    return res.status(400).json({message:"Validation error"})
  }
}

export default validate