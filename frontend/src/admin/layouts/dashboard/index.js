import React, { useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import { userData, logout } from "../../../redux/reducer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Table from "react-bootstrap/Table";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { _services } from "../../../Services/Api/index";
import axios from "axios";
import { url } from "../../../Services/BaseURL/index";

import { EnumDocType } from "constants/constants";
import EditIcon from '@mui/icons-material/Edit';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Loader from "components/Loader";

import success from "../../../assets/success.png";
import failed from "../../../assets/failed.png";

import MDBadge from "components/MDBadge";
import MDInput from "components/MDInput";

import MDAlert from "components/MDAlert";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea 
} from 'mdb-react-ui-kit';






function AdminDashboard () {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [dialogOpen, setdilogOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [tableData, setTableData] = useState({});
  const [id2update, setId2Update] = useState("");
  const [showDocList, setShowDocList] = useState(false);
  const [userList, setUserList] = useState();
  const [docListTable, setDocListTable] = useState({});
  const [isLoadin, setIsloading] = useState(false);
  const [docData, setDocData] = useState({
    documentType: "",
    documentDesc: "",
    uploadFile: "",
    userID: "",
  });
  const [docCount , setDocCount] = useState();
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    userType: "",
    password: "",
  });


  const [tempData, setTempData] = useState([]);













function findUser(e) {



let newTable = tableData.filter(x => x["name"].toLowerCase().includes(e))




setTempData(newTable)

}


  const [updateUserData, setUpdateUserData] = useState({ name: "", email: "" });

  const [modalShow, setModalShow] = useState(false);
  const [errMsg , setErrMsg] = useState('');

  const [pass , setPass] = useState(true);

  useEffect(() => {
    GetData();
  }, []);

  

  const toggleShow = () => setdilogOpen(!dialogOpen);

  function GetData() {

    setIsloading(true)
    _services.get_user_list().then((res) => {
      setTableData(res.data);
      setTempData(res.data)
      setTimeout(() => setIsloading(false),1000)
     
    });

    _services.total_doc().then((res) => {
      setDocCount(res.data)
    
      
    })
  }

  function handleClick(flag) {
    if (flag === "upload") {
      setIsloading(true)
      _services
        .get_user_list()
        .then((res) => {
          setUserList(res.data);
          setdilogOpen(true);
          setIsloading(false)
        })
        .catch((err) => {});
    } else {
      setCreateOpen(true);
    }
  }

  function handleDelete(id) {
    setIsloading(true)
    _services.delete_User(id).then((res) => {
     
      if (res.status === 200) {
        
        setModalShow(true)
        setErrMsg(res.data);
        GetData();
        setIsloading(false)
      }
    });
  }

  function handleUpdate(id) {
    setUpdateOpen(true);
    setId2Update(id);
  }

  function update_User() {
    setIsloading(true)
    _services.update_User(id2update, updateUserData).then((res) => {
      if (res.status === 200) {
        setUpdateOpen(false);
        GetData();
        setIsloading(false)
      }
    });
  }

  function create_User() {

    setIsloading(true)
    const generatedPass = `${Math.floor(Date.now() / 1000)}`;
    setNewUserData({ ...newUserData, password: generatedPass });

    _services.create_User(newUserData).then((res) => {
      if (res.status == 200) {

        setModalShow(true)
        setErrMsg(res.data)
        setCreateOpen(false);
        setIsloading(false)
        
        GetData();
      } else {

        setModalShow(true)
        setErrMsg(res.data)
        setPass(false)

      }
    });
  }

  function uploaded_Doc() {
    let formData = new FormData();
    formData.append("documentType", docData.documentType);
    formData.append("documentDesc", docData.documentDesc);
    formData.append("uploadFile", docData.uploadFile);
    formData.append("userID", docData.userID);

    setIsloading(true)

    axios
      .post(`${url}api/admin/doc`, formData)
      .then((response) => {
     
        if (response.status === 200) {
          setdilogOpen(false);
          setIsloading(true)
          setModalShow(true)
          setErrMsg(response.data)
          GetData();

        }
      })
      .catch((err) => {
        console.log(err);
        setModalShow(true)
        setErrMsg(response.data)
      });
  }

  function handleDocumentView(id) {
    setIsloading(true)
    _services.list_docs(id).then((res) => {
      console.log(res.data);


      if (res.status === 200) {
        setShowDocList(true);
        setDocListTable(res.data);
        setIsloading(false)
      }
    });
  }

  function deleteDoc(item) {
    setIsloading(true)
    const documentID = item._id;
    const userID = item.userID;
    _services.delete_document(documentID).then((res) => {
      if (res.status === 200) {
        handleDocumentView(userID);
        setIsloading(false)
      }
    });
  }

  function closeDocList() {
    setShowDocList(false);

    GetData();
  }

  return  (  isLoadin === true ? <Loader /> :
  <DashboardLayout>
  <DashboardNavbar />
  <MDBox py={3}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        
        <MDBox mb={1.5}>
          <ComplexStatisticsCard
            color="dark"
            icon="weekend"
            title="Total Document"
            count={docCount}
            percentage={{
              color: "success",
              amount: "+55%",
              label: "than lask week",
            }}
            
          />
          
         <MDBadge style={{marginTop: '-90px', marginLeft: '250px' , color: 'whitesmoke'}} color='dark' onClick={() => handleClick("upload")} badgeContent="Add Document" container />
          
        </MDBox>



      

    
      
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <MDBox mb={1.5}>
          <ComplexStatisticsCard
            icon="leaderboard"
            title="Total Users"
            count= {tableData.length}
            percentage={{
              color: "success",
              amount: "+3%",
              label: "than last month",
            }}
          />
            <MDBadge style={{marginTop: '-90px', marginLeft: '280px' , color: 'whitesmoke'}} onClick={() => handleClick("create")} badgeContent="Add User" container />
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <MDBox mb={1.5}>
          <ComplexStatisticsCard
            color="success"
            icon="store"
            title="Subscription Revenue"
            count= {tableData.length * 100}
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

     
  
      {dialogOpen === true && (
        <>


<MDBModal tabIndex='-1' show={dialogOpen} setShow={setdilogOpen}>
  <MDBModalDialog centered>
    <MDBModalContent>
      <MDBModalHeader>
        <MDBModalTitle>Upload Document</MDBModalTitle>
        <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody>
      <input
              type="file"
              onChange={(e) => {
                setDocData({ ...docData, uploadFile: e.target.files[0] });
              }}
            />

<Form.Select
              aria-label="Default select example"
              className="mt-3"
              onChange={(e) => {
                setDocData({ ...docData, userID: e.target.value });
              }}
            >
              <option>Select User</option>
              {userList.map((item) => (
                <option value={item._id}>{item.name}</option>
              ))}
            </Form.Select>
                
              <Form.Select
              aria-label="Default select example"
              className="mt-3"
              onChange={(e) => {
                setDocData({ ...docData, documentType: e.target.value });
              }}
            >
              <option>Select Document Type</option>
              <option value="1">ITR</option>
              <option value="2">Pan Card</option>
              <option value="3">Adhar Card</option>
              <option value="4">GST invoice</option>
            </Form.Select>
            <MDBTextArea placeholder='Document Description' className="mt-3" id='textAreaExample'  onChange={(e) => {
                setDocData({ ...docData, documentDesc: e.target.value });
              }}      type="text" rows={4} />
    
             
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color='secondary' onClick={toggleShow}>
          Close
        </MDBBtn>
        <MDBBtn onClick={() => uploaded_Doc()}>Save changes</MDBBtn>
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>

</>

      )}

      {createOpen === true && (
        <Modal show={createOpen} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Fill user Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Name of user"
              onChange={(e) => {
                setNewUserData({ ...newUserData, name: e.target.value });
              }}
            />
            <input
              type="email"
              placeholder="Email of user"
              onChange={(e) => {
                setNewUserData({ ...newUserData, email: e.target.value });
              }}
            />

            <Form.Select
              aria-label="Default select example"
              className="mt-3"
              onChange={(e) => {
                setNewUserData({ ...newUserData, userType: e.target.value });
              }}
            >
              <option>Select Type of User</option>
              <option value="1">Admin</option>
              <option value="2">User</option>
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => create_User()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {updateOpen === true && (
        <Modal show={updateOpen} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Update User Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MDInput 
              type="text"
              label="Name"
              onChange={(e) => {
                setUpdateUserData({ ...updateUserData, name: e.target.value });
              }}
            />
            <MDInput
              type="email"
              label="Email"
              onChange={(e) => {
                setUpdateUserData({ ...updateUserData, email: e.target.value });
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setUpdateOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => update_User()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showDocList === true && (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showDocList}
          animation={true}
        >
          <Modal.Header>
            <Modal.Title>List of documents</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Table striped bordered hover size="sm">
        <thead>
          <tr>
              <th>Description</th>
              <th>Type</th>
              <th>View</th>
              <th>Uploaded On</th>       
          </tr>
        </thead>
        <tbody>
        {docListTable.length > 0 &&
              docListTable?.map((item) => (
                
                  <tr>
                    <td className="td">{item.documentDesc}</td>

                    <td className="td"> {EnumDocType[item.documentType]}</td>

                    <td className="td">
                    <RemoveRedEyeIcon onClick={() => window.open(`${item.docUrl}`)}  />
                    </td>
                    <td className="td"> {item.updatedAt.slice(0, 10)}</td>
                    <td className="td">
                    <DeleteOutlinedIcon onClick={() => deleteDoc(item)} />                            
                    </td>
                  </tr>
                
              ))}
        </tbody>
      </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => closeDocList()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Grid>
  </MDBox>
  <Grid>
    <MDBox className="mt-5">
      <h2 style={{textAlign: 'center'}}>User Table</h2>
      <MDBox pr={1}>
              <MDInput label="Search User" onChange= {   (e) => findUser(e.target.value)} />
            </MDBox>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th className="th">Name</th>
            <th>Document No.</th>
            <th>Email</th>
            <th>Delete</th>
            <th>Update</th>
            <th>View Documents</th>
          </tr>
        </thead>
        <tbody>
          {tempData.length > 0 &&
            tempData?.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.documentNo}</td>
                <td>{item.email}</td>
                <td>
                  
                  <DeleteOutlinedIcon onClick={() =>  handleDelete(item._id)} />
                </td>
                <td>
          
                <EditIcon  onClick={() => handleUpdate(item._id)}    />
              
                </td>
                <td>
                <RemoveRedEyeIcon onClick={() => handleDocumentView(item._id)}   />
                  
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </MDBox>
  </Grid>
  <Footer />

  {modalShow &&  <Modal
      show={modalShow}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <img src={pass === false ? failed : success} style={{height: '100px', width: '100px', display:'flex', marginLeft : '40%',
        alignItems: 'center',
        justifyContent: 'center',
       }} alt="success logo"/>
        <p className="mt-3" style={{textAlign: 'center' , color:'green'}}>
          {errMsg}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false) }>Ok</Button>
      </Modal.Footer>
    </Modal> }






</DashboardLayout>
  
  );

  }
export default AdminDashboard
