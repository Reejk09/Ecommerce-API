const mongoose = require('mongoose');
// const User = require('./Useri');



  const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  title: {
    type : String,
    required : true,
    minLength : 3
  },
  price:{
    type : Number,
    default : 0,
    min : 0

  },
  description : {
    type : String,
    maxLength : 255,
  },
  createdBy : {
    type : ObjectId,
    ref: "User",
    required : true
  },
  image : {
    type : String,
  }

  
});
const Product = mongoose.model("Product",ProductSchema)
module.exports = Product;