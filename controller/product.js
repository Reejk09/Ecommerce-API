 const path = require("path")
 const Product = require("../model/Product")
 const User = require("../model/Useri")
 
 const fetchProduct = async (req,res)=>{
   // req.query.search
    // res.send("list of products")
    let product = await Product.find({title: new RegExp(req.query.search,"i")}).sort({title :1});

    //aggregation : advanced find method 
    res.send(product)
}


const storeProduct = async (req,res,next)=>{
   
   
   try{
       
           let imagePath = null;
     
           // res.send("mew product added")
          //  console.log(req.files.image);
          if(req.files.image){
              let rootPath = path.resolve();
              imagePath = path.join("uploads",`${req.files.image.name}`);
              req.files.image.mv(path.join(rootPath,imagePath))
              console.log(imagePath);
     
           }

    
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
const deleteProduct = async (req,res)=>{
   // res.send("list of products")
//    let product = await Product.find({});
   res.send(" product deleted")
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
