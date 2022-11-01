
import React, { useEffect } from 'react'
// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import { userData,logout } from '../../../redux/reducer';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useDispatch, useSelector } from 'react-redux'
import { useLocation,useNavigate   } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {_services} from '../../../Services/Api/index'
import axios from 'axios';
import {url} from '../../../Services/BaseURL/index';

function Dashboard() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate  = useNavigate ();

  const [ dialogOpen, setdilogOpen] = useState(false);

  const [userList , setUserList] = useState();

  const [docData , setDocData] = useState({documentType : '', documentDesc : '', uploadFile : '', userID: ''});


  console.log(docData)

  useEffect(() => {
   // onLoad()
}, [])

console.log(docData.uploadFile)


function handleClick() {
 _services.get_user_list().then(res => {


  console.log(res)
 
 setUserList(res.data)
 setdilogOpen(true)

}).catch(err => {
   console.log(err)
})
}


function uploaded_Doc() {
  

  let formData = new FormData();
  formData.append('documentType', docData.documentType)
  formData.append('documentDesc', docData.documentDesc)
  formData.append('uploadFile', docData.uploadFile)
  formData.append('userID',docData.userID)


  console.log(docData)


  axios.post(`${url}api/admin/doc`, formData)
  .then((response) => {
console.log(response)
  }).catch((err) => {
    console.log(err)
  })


  // _services.upload_document(docData).then(res => {




  // })

}
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          {console.log(dialogOpen)}
          <div>Upload a document</div>
          <button onClick={() => handleClick()}> upload document </button>

          {dialogOpen === true &&  <Modal show={dialogOpen} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='file'  onChange={(e) => {setDocData({...docData , uploadFile : e.target.files[0]})}}  />
          <Form.Select aria-label="Default select example" className='mt-3' onChange={(e) => {setDocData({...docData , documentType : e.target.value})}}>
      <option>Select Document Type</option>
      <option value="1">ITR</option>
      <option value="2">Pan Card</option>
      <option value="3">Adhar Card</option>
      <option value="3">GST invoice</option>
    </Form.Select>
    <textarea type='text' placeholder='document description' onChange={(e) => {setDocData({...docData , documentDesc : e.target.value})}}    />

    <Form.Select aria-label="Default select example" className='mt-3' onChange={(e) => {setDocData({...docData , userID : e.target.value})}}>
    <option>Select User</option>
      {userList.map((item) => <option value={item._id}>{item.name}</option> )}
      
    
    </Form.Select>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => setdilogOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick= { () => uploaded_Doc()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> }
          
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
