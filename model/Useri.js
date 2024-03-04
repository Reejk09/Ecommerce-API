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
    required : true

    //custom validation for email check email here 
  },
  phone : Number,
  password :{
    type : String,
    required: true
     
  } 
 
  
});
const User = mongoose.model("User",UserSchema)
module.exports = User;