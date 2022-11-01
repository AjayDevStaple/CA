const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('../models/Users')



router.use(cors());




//signup
router.post('/signup', async (req, res) => {
  try {

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      userType: req.body.userType,
    });

    console.log(newUser);

    const user = await newUser.save();


  

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    !user && res.status(404).json('User not found');

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    !validPassword && res.status(400).json('Password is invalid');

    const userData = {
      userId: user._id,
      email: user.email,
      userType: user.userType,
      
    };

    // const userDatatoSend = {
    //   userId: user._id,
    //   email: user.email,
    //   userType: user.admin,
      
    // };
    
    const accessToken = jwt.sign(
      userData,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '10000000000000000000',
      }
    );

    const uData = {
      userId: user._id,
      email: user.email,
      userType: user.userType,
      token:accessToken
    };


    res.status(200).json(uData);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
