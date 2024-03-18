 const path = require("path")
 const Product = require("../model/Product")
 const User = require("../model/Useri");
const Joi = require("joi");
const fs = require("fs");
// const path = require ( "path")
 
 const fetchProduct = async (req,res)=>{
   // req.query.search
    // res.send("list of products")
    try{

    
    let sort = req.query.sort|| "dateDesc";
    let priceFrom = parseFloat(req.query.priceFrom) || 0;
    let priceTo = req.query.priceTo || 9999999
    let perPage = parseInt(req.query.perPage) || 5
    let page = parseInt(req.query.page) || 1;
    let sortBy = {
      createdAt : -1
    } 

    if(sort == "priceAsc"){
      sortBy={
         price :1
      }
    }else if (sort = "priceDesc"){
      sortBy = {price : -1}
    }else if (sort = "titleAsc"){
      sortBy = {title : 1}
    }else if (sort = "titleDesc"){
      sortBy = {title : -1}
    }

    let productFilter = {title: new RegExp(req.query.search,"i"),
    //  price :{$gte :100},
    //  price :{$lte :500},
     $and:[{  price :{$gte :priceFrom}},{price :{$lte :priceTo}}]
    }

    


    let product = await Product.find(productFilter).sort(sortBy)
   .skip((page-1)*perPage)
   .limit(perPage)


   let totalProducts = await Product.countDocuments(productFilter)

// totalProducts = totalProducts.length;
   


    //aggregation : advanced find method 
    res.send({
      page,
      perPage,
      total :totalProducts,
      data : product
    })
}
 catch(err){
   next(err)
 }
}


const storeProductValidationSchema = Joi.object({
   image: Joi.object({
      size : Joi.number().max(2*1024*1024).messages({
         "number.max":"file mush be less than 2 "
      }),
      // mimetype: Joi.string().valid("image/jpeg,image/jpg,image/png"),
   }),
   title: Joi.required(),
});
const storeProduct = async (req,res,next)=>{
   try {
      await storeProductValidationSchema.validateAsync({...req.body,...req.files},
         {allowUnknown:true,
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
       
           let imagePath = null;
     
           // res.send("mew product added")
          //  console.log(req.files.image);
          if(req.files?.image){
              let rootPath = path.resolve();
              let uniqueTimestamp = Date.now()+ Math.floor(Math.random()*1000);
              imagePath = path.join("/","uploads",`${uniqueTimestamp}-${req.files.image.name}`).replaceAll("\\","/")
              req.files.image.mv(path.join(rootPath,imagePath))
              console.log(imagePath);
     
           }
           console.log(req.files.image);

    
   //  const {title,price,createdBy} = req.body;
    // const name = req.body.name;
    
    let products = await Product.create({...req.body,image : imagePath,createdBy : req.user._id
   });
   console.log(products);
    res.send(products)
   }catch(err){
      next(err)
   }
    
}
const updateProduct = async (req,res)=>{
   // res.send("list of products")
//    let product = await Product.find({});
let product = await Product.findByIdAndUpdate()
   res.send(" product updated")
}
const deleteProduct = async (req,res,next)=>{
   try{
      let matched = await Product.findById(req.params._id);
      if(!matched){
         let error =  new Error()
         error.statusCode = 404;
         error.msg = "not found"
         throw error;

      }

      let products = await Product.findByIdAndDelete({_id:req.params._id});
      fs.unlinkSync(path.join(path.resolve(),products.image))
      res.send(" product deleted")
   }catch(err){
      next(err)
   }
   // res.send("list of products
}

module.exports = {
    fetchProduct,
    storeProduct,
    updateProduct,
    deleteProduct,
    // fetchUser,
    // storeUser,
    // updateUser,
    // deleteUser
}
