import React, { useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput"
// Material Dashboard 2 React example components
import { userData, logout } from "../../../redux/reducer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { _services } from "../../../Services/Api/index";
import { useState } from "react";
import { EnumDocType } from "constants/constants";

import EditIcon from "@mui/icons-material/Edit";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
//import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import GooglePayButton from "@google-pay/button-react";

import "bootstrap/dist/css/bootstrap.min.css";
import MDButton from "components/MDButton";
function UserDashboard() {
  const [data, setData] = useState([]);
  console.log("----------user-dashboard-------------");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { token, userType, name, userId } = useSelector((state) => state?.userProfile?.userData);

  function download(filename) {
    //starts
    fetch("http://127.0.0.1:8081/" + filename, {
      method: "GET",
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `FileName.pdf`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
    //ends
  }
  useEffect(() => {
    handleDocumentView(userId);
    // onLoad()
  }, []);

  function handleDocumentView(userId) {
    _services.list_docs(userId).then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data);
      }
    });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid>
        <MDBox className="mt-5">
       
          <h2 style={{ textAlign: "center" }}>Document Table</h2>

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
              {data.length > 0 &&
                data?.map((item) => (
                  <tr>
                    <td>{item.documentDesc}</td>
                    <td>{EnumDocType[item.documentType]}</td>
                    <td>
                      <RemoveRedEyeIcon
                        onClick={() => window.open(`http://127.0.0.1:8081/${item.docUrl}`)}
                      />
                    </td>
                    <td>{item.updatedAt.slice(0, 10)}</td>
                    <td>
                      {/* <a href={`http://127.0.0.1:8081/${item.docUrl}`} download >Download</a> */}
                      <MDButton onClick={() => download(item.docUrl)}>Download</MDButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </MDBox>
      </Grid>

      <Footer />
    </DashboardLayout>
  );
}

export default UserDashboard;
