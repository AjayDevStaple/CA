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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { _services } from "../../../Services/Api/index";
import { useState } from "react";
import { EnumDocType } from "constants/constants";

import EditIcon from '@mui/icons-material/Edit';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
//import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import "bootstrap/dist/css/bootstrap.min.css";
import MDButton from "components/MDButton";
function UserDashboard() {
  const [data, setData] = useState([]);
  console.log("----------user-dashboard-------------");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { token, userType , name , userId} = useSelector((state) => state?.userProfile?.userData);
 
console.log(userId)

  useEffect(() => {
    
  handleDocumentView(userId)
    // onLoad()
  }, []);


  function handleDocumentView(userId) {
    
    _services.list_docs(userId).then((res) => {
      console.log(res);
      if (res.status === 200) {
   console.log(res.data)
    setData(res.data)
      }
    });
  }

  


  return (
    <DashboardLayout >
      <DashboardNavbar />



<div>


{/* 
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Document Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">View</TableCell>
            <TableCell align="right">Download</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {data.map((item) => (
            <TableRow
         
            >
              <TableCell component="th" scope="row">
                
              </TableCell>
              <TableCell align="right">{item.documentType}</TableCell>
              <TableCell align="right">{item.documentDesc}</TableCell>
              <TableCell align="right">{item.updatedAt}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}





    
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
                    <td className="td">{item.documentDesc}</td>

                    <td className="td"> {EnumDocType[item.documentType]}</td>

                    <td className="td">
                    <RemoveRedEyeIcon onClick={() => window.open(`http://127.0.0.1:8081/${item.docUrl}`)}  />
                    </td>
                    <td className="td"> {item.updatedAt}</td>

                    <a href={`http://127.0.0.1:8081/${item.docUrl}`} download>Download file</a>
                  
                  </tr>
                
              ))}
        </tbody>
      </Table>


</div>
      

     
      <Footer />
    </DashboardLayout>
  );
}

export default UserDashboard;
