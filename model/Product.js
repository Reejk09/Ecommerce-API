const mongoose = require('mongoose');
// const User = require('./Useri');



  const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  title: {
    type : String,
    required : true
  },
  price:{
    type : Number,
    default : 0

  },
  createdBy : {
    type : ObjectId,
    ref: "User",
    required : true
  }
  
});
const Product = mongoose.model("product",ProductSchema)
module.exports = Product;