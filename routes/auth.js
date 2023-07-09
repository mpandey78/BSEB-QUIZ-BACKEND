const User = require("../models/User.js");
const router = require('express').Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        mobile:req.body.mobile,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
          ).toString(),
        address: req.body.address
      });
    
      try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (err) {
        res.status(500).json(err);
      }
})

//Login

router.post("/login", async (req, res) => {
    //find by user id
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json({
          message: "Username is not found. Invalid login credentials.",
          success: false
        });
      }
  
  
      //get data from database and decrpt database password
  
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
  
      //convert into string (using charecter we can define utf8)
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  
      if(OriginalPassword !== req.body.password){
        return res.status(404).json({
          message: "password is not match, Invalid login credentials.",
          success: false
        });
      }
      
      
      //verify by token
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
       process.env.JWT_SEC,
       { expiresIn: "3d" }  //we cannot use this token after 3 days
     );
  
  
      //send data without password
     const { password,cpassword, ...others } = user._doc;
  
      res.status(200).json({ ...others, accessToken });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
    // Admin login
  router.post('/admin/login', async (req, res) => {
    try {
      const admin = await User.findOne({ username: req.body.username ,isAdmin:true});

      // const { username, password } = req.body;
      console.log(username,password,isAdmin);
      // Check if the username exists and is an admin
      // const admin = await User.findOne({ username, isAdmin: true });
      console.log(admin,"dfasfasfasf");
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      // Compare the password
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Create and send the JWT token
      const token = jwt.sign({ id: admin._id, isAdmin: admin.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, userId: admin._id });
    } catch (err) {
      res.status(500).json({ error: 'Failed to login' });
    }
  });

module.exports = router
