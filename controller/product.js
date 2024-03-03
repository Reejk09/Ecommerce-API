 const Product = require("../model/Product")
//  const User = require("../model/Useri")
 
 const fetchProduct = async (req,res)=>{
    // res.send("list of products")
    let product = await Product.find({});
    res.send(product)
}


const storeProduct = async (req,res)=>{
    // res.send("mew product added")
    
    const {title,price,createdBy} = req.body;
    // const name = req.body.name;
    let products = await Product.create({title,price,createdBy})
    res.send(products)
    
    
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
