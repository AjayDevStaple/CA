const authenticateToken = require('./users');
const User = require('../models/Users');
const Doc = require('../models/Doc');
const router = require('express').Router();

const directory = 'C:/Users/Computer/Desktop/ca-api/uploaded_Docs/';


//get the list of users expect admin

router.get('/users', async (req, res) => {
  try {
  
      const users = await User.find({ userType: '2' });
      res.status(200).json(users);
     
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete user if u are admin
router.delete('/user/:id', authenticateToken, async (req, res) => {
  console.log('deleting user');
  try {
    if (req.user.admin === true) {
      const response = await User.findOneAndDelete({
        _id: req.params.id,
      });

      console.log(response);

      if (!response) {
        res.status(404).json('User is not here');
      } else {
        res
          .status(200)
          .json('User has been whose email is' + response.email);
      }
    } else {
      res.status(404).json('only admin can delete this user');
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//upload document files

router.post('/doc', async (req, res) => {
  console.log(req)
  const fileName = Date.now() + '' + req.files.uploadFile.name;
  const file = req.files.uploadFile;
  let uploadPath = __dirname + '/uploaded_Docs/' + fileName;
  console.log(uploadPath)


  file.mv(uploadPath, (err) => {
    console.log('ehej');
    // if (err) {
    //   return res.send(err);
    // }
  });

  const newDoc = new Doc({
    userID: req.body.userID,
    documentType: req.body.documentType,
    documentDesc: req.body.documentDesc,
    docUrl: uploadPath,
  });

   // console.log(listDoc.length)

    const DocumentNo = await User.findById(req.body.userID)

    console.log('-----------------------------------')
    console.log(DocumentNo)

//     const updateDocCount = await User.findByIdAndUpdate(DocumentNo + 1)

// console.log(updateDocCount)
  const document = await newDoc.save();

  res.status(200).json(document);
});


//get all the document of a user

router.get('/list-doc', async (req, res) => {
  try{
    const listDoc = await Doc.find({userID : req.body.userID})
    res.status(200).json(listDoc)
    // console.log(listDoc.length)

    // const DocumentNo = await User.findById(req.body.userID, {documentNo : listDoc.length})

    

  }catch(err) {
    res.status(500).json(err)
  }
  
})



module.exports = router;
