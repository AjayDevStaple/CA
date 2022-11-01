const authenticateToken = require('./users');
const User = require('../models/Users');
const Doc = require('../models/Doc');
const router = require('express').Router();
const fs = require('fs');


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
router.delete('/user/:id',  async (req, res) => {
 
  try {
   
      const response = await User.findOneAndDelete({
        _id: req.params.id,
      });

      const deleteFromLocal = await Doc.find({userID: req.params.id})

      const deleteDoc = await Doc.deleteMany({userID : req.params.id}); 

      




      console.log(deleteFromLocal)


      





// var filePath = 'c:/book/discovery.docx'; 
// fs.unlinkSync(deleteFromLocal)

      if (!response) {
        res.status(404).json('User is not here');
      } else {
        res
          .status(200)
          .json('User has been deleted');
      }
    
      
    
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//upload document files

router.post('/doc', async (req, res) => {

  const fileName = Date.now() + '' + req.files.uploadFile.name;
  const file = req.files.uploadFile;
  let uploadPath = __dirname + '/uploaded_Docs/' + fileName;
  


  file.mv(uploadPath, (err) => {
   
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

 

   const listDoc = await Doc.find({userID : req.body.userID})
  

   const newDocNo = listDoc.length + 1;

   const updateDocNo = await User.findByIdAndUpdate(req.body.userID , {documentNo : newDocNo})

   



  const document = await newDoc.save();

  res.status(200).json(document);
});


//delete document

//get all the document of a user

router.get('/list-doc', async (req, res) => {
  try{
    const listDoc = await Doc.find({userID : req.body.userID})
    res.status(200).json(listDoc)


    // const DocumentNo = await User.findById(req.body.userID, {documentNo : listDoc.length})

    

  }catch(err) {
    res.status(500).json(err)
  }
  
})



module.exports = router;
