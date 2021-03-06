const jsonwebtoken = require("jsonwebtoken")
module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization
        const Token = token.split(' ')[1] //Separate bearer from the token
        const decodedToken = jsonwebtoken.verify(Token,process.env.auth_secretkey)
        if(decodedToken.type=="tutor"){
          return  next()            
        }
        if(decodedToken.type!=="tutor"){
            res.status(400).json({
                message:"Invalid token, current user must be signed in as a parent to see fetch this information"
            })            
        }
        // next()
    }
    catch(error){
        res.status(401).json({
            message:"Invalid token",
            error
        })
    }
}