const router = require("express").Router();
const User = require("../models/Users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doc = require("../models/Doc");
// const authenticateToken = require('../routes/auth')

//authenticateUser
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
    if (err) return res.sendStatus(403);
    req.user = userData;
    console.log(req.user);

    next();
  });
}

//get all my document

router.get("/mydocs", authenticateToken, async (req, res) => {
  console.log("running");

  try {
    console.log(req.user.userId);

    const allDoc = await Doc.find({ userID: req.user.userId });

    // const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(allDoc);
  } catch (err) {
    return res.status(500).json(err);
  }
});

(module.exports = router), authenticateToken;
