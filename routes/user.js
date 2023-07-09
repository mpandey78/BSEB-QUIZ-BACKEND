const { verifyTokenAndAuthorization } = require('./verifyToken');
const router = require('express').Router();
const User = require("../models/User.js");

router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
  if(req.body.password){
    req.body.password =  CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try{
      const updateUser = await User.findByIdAndUpdate(req.params.id,{
        $set:req.body
      },{ new:true })

      res.status(200).json(updateUser);
  
    } catch (err) {
    res.status(500).json(err);
  }
})

router.delete("/:id",verifyTokenAndAuthorization, async (req,res)=>{
  try{
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been delete sucessfully");

  } catch (err){
    res.status(500).json(err);
  }
})

router.get("/find/:id", async (req,res)=>{
  try{
      const user = await User.findById(req.params.id);
      const { password,cpassword, ...others } = user._doc;
      res.status(200).json(others);

  } catch (err){
    res.status(500).json(err);
  }
})

router.get("/findalluser", async (req,res)=>{
  try{
      const users = await User.find();
      res.status(200).json(users);

  } catch (err){
    res.status(500).json(err);
  }
})


module.exports = router
