const { string } = require('joi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(() => console.log('Connected!'));

  const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  name :{
    type : String,
    required : true

  }, 
  email : {
    type : String,
    required : true,

    //custom validation for email check email here 
    validate : {
      validator: async (value)=>{
      let matched = await mongoose.models.User.findOne({email:value})
      if(matched){

        return false;
      }

    },
    message : "email already used "
  },
},
  phone : Number,
  password :{
    type : String,
    required: true
     
  },
  role:{
    type : String,
    enum : ["buyer", "seller"],
    required : true,
    set:(value)=>{
      console.log(value);
      return value.toLowerCase();
    }
  
  },
  address:{
    street : String,
    ward : Number
  },
 
  
});
const User = mongoose.model("User",UserSchema)
module.exports = User;