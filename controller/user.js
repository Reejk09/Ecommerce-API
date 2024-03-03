const User = require("../model/Useri")
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUpValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .min(8)
        .required(),



});
const loginValidationSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .required(),


});
const signUp =async (req,res,next)=>{
    try {
         await signUpValidationSchema.validateAsync(req.body,{allowUnknown:true,
            abortEarly:false});
    }catch (err) { 
        return res.status(400).send({
            msg : "validation error",
            errors:err.details.map(el=>{
                return{
                    field : el.context.key,
                    msg : el.message
                }
            })
        })


                
            }
            try{
                
        let hashed = await bcrypt.hash(req.body.password,10);
        let users = await User.create({...req.body,password:hashed})
        // users = users.toObject()
        // delete users.password 
        users.password = undefined   
        res.send(users)
    }catch(err){
        next(err)
    }
    
        // res.send("mew product added")
        
}

const login =async (req,res)=>{
    try {
        await loginValidationSchema.validateAsync(req.body,{allowUnknown:true,
           abortEarly:false});
   }catch (err) { 
       console.log(err);
               return res.status(400).send(err)
               
   }
   try{

       
       let user = await User.findOne({email:req.body.email })
       let result = await bcrypt.compare(req.body.password,user.password)
       
       if(user && result){
        let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
           res.send({
            token
           })
           
        }else{
            res.status(401).send({msg : "invalid credintials"})
        }
        
    }catch(err){
        next(err)
    }
//null


// console.log(hashed);


//    if(user){
    
//        res.send("login succesful")
//     }else{
//        res.status(401).send(error={msg:"invalid credintials"})
//    }


}





module.exports = {
    signUp,login
}