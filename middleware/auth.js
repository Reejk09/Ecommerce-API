const jwt = require("jsonwebtoken");
const { SELLER } = require("../constants/role");
function chechkAuthentication(req,res,next){
    // console.log(req.headers.authorization);
    let token = req.headers.authorization?.replaceAll("Bearer ","");
    // console.log(token);
    if(token){
        try{

            const decodedUser = jwt.verify(token,'yourSecretSignature')
            // console.log(decodedUser);
            req.user = decodedUser
            // console.log(req.user);
            return next();
            
        } catch(err){

        }
       
        
    }

    return res.status(401).send({
        msg : "unauthorized"
    })
   
}
const isSeller = (req,res,next) =>{
    if(req.user.role=== SELLER){
        return next()
    }

    res.status(403).send({
        msg: "only for sellers"
    })
}
module.exports = {
    chechkAuthentication,isSeller
}


