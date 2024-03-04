// const handleServerError = (err,req,res,next)=>{
//     res.status(400).send()
// }


//can be directly export 
module.exports = (err,req,res,next)=>{
    let statusCode = 500;
    let errors = err.name
    let msg = "Server Error"
    if(err.name == "ValidationError"){
        statusCode = 400;
        msg = "Bad Request / Validation error"
        errors = {
            email : "already exists",
            password : "required field"
        },
        {
            error : err.Stack
        }
    }
    
    
    res.status(statusCode).send({
        msg,
        errors,
    })



    // console.log(err.name);
}