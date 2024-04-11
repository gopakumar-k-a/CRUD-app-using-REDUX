const asyncHandler=require('express-async-handler')

module.exports={

   loadAdmin:asyncHandler((async(req,res)=>{
    res.status(200).json({message:'loaded admin log in page'})
   }))
}