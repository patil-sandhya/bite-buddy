const UserModel = require('../Models/userModel');
const {blacklist} = require("../blacklist")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.createUser = async (req, res) => {
   const {name,email,password} =req.body
    console.log(req.body)
    try {
      let userExist = await UserModel.findOne({email})
      if(userExist){
        res.status(200).json({msg:"User already exist, please login"})
      }else{
        bcrypt.hash(password, 5, async(err,hash)=>{
          console.log("hash")
            if(err){
                res.send(err)
            }else{
                const user = new UserModel({
                    name,email,
                    password:hash
                });
                await user.save();
                res.status(200).send({ msg: "New user registered", newUser: req.body });
            }
        })
      }
    
      
    } catch (error) {
      res.status(400).send({"err":error});
    }
}

exports.loginUser = async (req, res) => {
  let {email,password}=req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
        bcrypt.compare(password, user.password, (err, result)=>{
            if(err){
                res.status(400).send({ msg: "please try again later" });
            }else
            if(result == true){
                const token = jwt.sign({user:user},process.env.secretKey,{expiresIn:3600})
                res.status(200).send({ msg: "Login successfull", "token":token, "name":user.name, "address": user?.address,"email":user.email, "userid":user._id });
            }else{
              res.status(400).send({ msg: "invalid credential" });
            }

        })
        }else{
      res.status(400).send({ msg: "invalid credential" });

        }
    } catch (error) {
        console.log(error)
    }
};

exports.logoutUser = async (req, res)=>{
     const token = req.headers.authorization?.split(" ")[1]
  try {
    blacklist.push(token)
    res.status(200).send({ msg: "logout"});

  } catch (error) {
    res.status(400).send({ "error": error});
    
  }
}

// controllers/userController.js

exports.saveAddress = async (req, res) => {
  const { userId } = req.params;
  const { firstName, phone, street, city, pincode } = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        address: { firstName, phone, street, city, pincode }
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });
    // const sortAddress = `${user.address.firstName}, `
    res.status(200).json({ message: 'Address saved', address: user.address });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

exports.getUserAddress = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId).select('address');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ address: user.address });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
