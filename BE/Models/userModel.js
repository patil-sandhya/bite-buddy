const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  street: String,
  city: String,
  pincode: String
});

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: addressSchema 
},{
    versionKey:false
})

const UserModel = mongoose.model("user", userSchema)
module.exports = UserModel;