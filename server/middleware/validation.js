import jwt from "jsonwebtoken"


export const checktoken = (req,res,next)=>{
    

    try{
        const token  = req.headers.authorization
        if(!token){
            res.status(401).json({msg:"invalid token"})
        }
        const checkjwt = jwt.verify(token,process.env.JWT_SECURE)
        
        
        req.users = checkjwt
        next()

    }catch(error){
        console.log("some err",error)
        res.status(401).json({msg:"Your token is brake so please login again"})
    }
}




