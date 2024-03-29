const mongoose = require('mongoose');
// const User = require('./Useri');



  const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
    products :[
     {
        _id:ObjectId,
        rate :{
            type : Number,
            required :true
        },
        title :{
            type :String,
            required : true
        },
        quantity : Number,

        // status:{
        //     type:String,
        //     enum :["pending","completed","reject"],
        //     default : "pending"
            
        // }
        createdBy :{
            type :ObjectId,
            required:true
        },
        status:{
                type:String,
                enum :["pending","completed","reject"],
                default : "pending"
        }
    },
]
  

  
});
//this can also be done in order.js controller 
// OrderSchema.post("save",function(){
//     let order = this;
//     let orderProducts = order.products;
//     orderProducts.forEach(async el=>{
//     await Product.findByIdAndUpdate(el._id,{$inc:{inStock:-el.quantity}})
//     });
// })

const Order = mongoose.model("Order",OrderSchema)
module.exports = Order;