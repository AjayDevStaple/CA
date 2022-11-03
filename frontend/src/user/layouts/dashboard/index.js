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
import Table from 'react-bootstrap/Table';

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { _services } from "../../../Services/Api/index";
import axios from "axios";
import { url } from "../../../Services/BaseURL/index";

import { EnumDocType } from "constants/constants";

import "./style.css";

function Dashboard() {
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
  const [docData, setDocData] = useState({
    documentType: "",
    documentDesc: "",
    uploadFile: "",
    userID: "",
  });
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    userType: "",
    password: `${Math.floor(Date.now() / 1000)}`,
  });
  const [updateUserData, setUpdateUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    GetData();
  }, []);

  function GetData() {
    _services.get_user_list().then((res) => {
      setTableData(res.data);
    });
  }

  function handleClick(flag) {
    if (flag === "upload") {
      _services
        .get_user_list()
        .then((res) => {
          setUserList(res.data);
          setdilogOpen(true);
        })
        .catch((err) => { });
    } else {
      setCreateOpen(true);
    }
  }

  function handleDelete(id) {
    _services.delete_User(id).then((res) => {
      console.log(res);
      if (res.status === 200) {
        GetData();
      }
    });
  }

  function handleUpdate(id) {
    setUpdateOpen(true);
    setId2Update(id);
  }

  function update_User() {
    _services.update_User(id2update, updateUserData).then((res) => {
      if (res.status === 200) {
        setUpdateOpen(false);
        GetData();
      }
    });
  }

  function create_User() {
    _services.create_User(newUserData).then((res) => {
      if (res.status == 200) {
        setCreateOpen(false);
        GetData();
      }
    });
  }

  function uploaded_Doc() {
    let formData = new FormData();
    formData.append("documentType", docData.documentType);
    formData.append("documentDesc", docData.documentDesc);
    formData.append("uploadFile", docData.uploadFile);
    formData.append("userID", docData.userID);

    axios
      .post(`${url}api/admin/doc`, formData)
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          setdilogOpen(false);
          GetData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDocumentView(id) {
    _services.list_docs(id).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setShowDocList(true);
        setDocListTable(res.data);
      }
    });
  }

  function deleteDoc(item) {
    const documentID = item._id;
    const userID = item.userID;
    _services.delete_document(documentID).then((res) => {
      if (res.status === 200) {
        handleDocumentView(userID);
      }
    });
  }

  function closeDocList() {
    setShowDocList(false);

    GetData();
  }

  console.log(showDocList);
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

          <button onClick={() => handleClick("upload")}>UPLOAD </button>

          <button onClick={() => handleClick("create")}> create user </button>

          {dialogOpen === true && (
            <Modal show={dialogOpen} animation={true}>
              <Modal.Header closeButton>
                <Modal.Title>Upload Document</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                    setDocData({ ...docData, documentType: e.target.value });
                  }}
                >
                  <option>Select Document Type</option>
                  <option value="1">ITR</option>
                  <option value="2">Pan Card</option>
                  <option value="3">Adhar Card</option>
                  <option value="4">GST invoice</option>
                </Form.Select>
                <textarea className="mt-3" style={{ width: '465px' }}
                  type="text"
                  placeholder="document description"
                  onChange={(e) => {
                    setDocData({ ...docData, documentDesc: e.target.value });
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
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setdilogOpen(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => uploaded_Doc()}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
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
                <input
                  type="text"
                  placeholder="Update Name of user"
                  onChange={(e) => {
                    setUpdateUserData({ ...updateUserData, name: e.target.value });
                  }}
                />
                <input
                  type="email"
                  placeholder="Update Email of user"
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
                <tr>
                  <th className="th">Description</th>
                  <th className="th">Type</th>
                  <th className="th">View</th>
                  <th className="th">Uploaded On</th>
                </tr>

                {docListTable.length > 0 &&
                  docListTable?.map((item) => (
                    <table className="table">
                      <tr>
                        <td className="td">{item.documentDesc}</td>

                        <td className="td"> {EnumDocType[item.documentType]}</td>

                        <td className="td">
                          {" "}
                          <a href={"http://127.0.0.1:8081/" + item.docUrl}>View</a>{" "}
                        </td>
                        <td className="td"> {item.updatedAt}</td>
                        <td className="td">
                          <button onClick={() => deleteDoc(item)}> Delete Doc</button>
                        </td>
                      </tr>
                    </table>
                  ))}
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
          <h2>User Table</h2>

          {/* <Table striped bordered hover>
            <thead>
            <tr>
              <th>Name</th>
              <th>Document No.</th>
              <th>Email</th>
              <th>Delete</th>
              <th>Update</th>
              <th>View Documents</th>
            </tr>
            </thead>
          </Table> */}
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Document No.</th>
                <th>Email</th>
                <th>Delete</th>
                <th>Update</th>
                <th>View Documents</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 &&
                tableData?.map((item) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.documentNo}</td>
                    <td>{item.email}</td>
                    <td>
                      <button onClick={() => handleDelete(item._id)}>delete</button>
                    </td>
                    <td>
                      <button onClick={() => handleUpdate(item._id)}>update user</button>
                    </td>
                    <td>
                      <button onClick={() => handleDocumentView(item._id)}>View</button>
                    </td>
                  </tr>))
              }
            </tbody>

          </Table>

          {/* {tableData.length > 0 &&
            tableData?.map((item) => (
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.documentNo}</td>
                    <td>{item.email}</td>
                    <td>
                      <button onClick={() => handleDelete(item._id)}>delete</button>
                    </td>
                    <td>
                      <button onClick={() => handleUpdate(item._id)}>update user</button>
                    </td>
                    <td>
                      <button onClick={() => handleDocumentView(item._id)}>View</button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            ))} */}
        </MDBox>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
