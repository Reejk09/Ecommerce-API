const jwt = require("jsonwebtoken")
function chechkAuthentication(req,res,next){
    console.log(req.headers.authorization);
    let token = req.headers.authorization?.replaceAll("Bearer ","");
    console.log(token);
    if(token){
        try{
            const decodedUser = jwt.verify(token,'shhhhh')
            // console.log(decodedUser);
            req.user = decodedUser
            console.log(req.user);
            return next()
        }
    catch(err){

    }

    return res.status(401).send({
        msg : "unauthorized"
    })
    }


}

module.exports = {
    chechkAuthentication
}