// const handleServerError = (err,req,res,next)=>{
//     res.status(400).send()
// }


//can be directly export 
module.exports = (err,req,res,next)=>{
    let statusCode = 500;
    let errors = null
    let msg = "Server Error"
    if(err.name == "ValidationError"){
        msg = "Bad Request / Validation error"
        statusCode = 400;
        // console.log(Object.entries(err.errors));
        let errsArray = Object.entries(err.errors);
        errors = []
        // console.log(err.errors);
        errsArray.forEach(el=>{
            errors.push({
                field : el[0],
                msg : el[1].message
            })

        })
    res.status(statusCode).send({
        msg,
        errors,
    })
}
}
    
    


