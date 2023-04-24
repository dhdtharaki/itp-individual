import React, { useEffect, useState,useRef } from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import { Body } from './AddReservation'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Footer from '../components/Footer';
import { Button } from '@mui/material';
import axios from 'axios';
import { Link, NavLink  } from 'react-router-dom';
import {useReactToPrint} from 'react-to-print'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const TableContainer = styled.div`
  margin: 90px 0;
`
const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items : center;
  fles-directions: column;
  font-family: Arial;
  width : 300px;
  height : 400px;
  margin-top:20px ;
`

const Reservations = () => {
  const componentPdf = useRef();
  const [reservations, setReservations] = useState([]);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    
    axios
      .get(`http://localhost:5000/api/reservation/all/${id}`)
      .then((response) => {
        setReservations(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const handleDelete = (reservationId) => {
    axios
      .delete(`http://localhost:5000/api/reservation/${reservationId}`)
      .then(() => {
        setReservations(reservations.filter((reservation) => reservation._id !== reservationId));
        alert("You have cancelled a reservation!")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generatePDF= useReactToPrint({
      content:() => componentPdf.current,
      documentTitle : "Reservations",
      onAfterPrint:()=> alert("Data saved in PDF")
  });

  /*const Table = ({ data }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    
    const filtered = data.filter((reservation) =>
    reservation.name.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredData(filtered);
  };
  filteredData.map((reservation) => (
    <TableBody>
    <TableRow key={reservation._id}>
              <TableCell>{reservation.flightName}</TableCell>
              <TableCell>{reservation.firstName}</TableCell>
              <TableCell>{reservation.lastName}</TableCell>
              <TableCell>{reservation.email}</TableCell>
              <TableCell>{reservation.phone}</TableCell>
              <TableCell>{reservation.country}</TableCell>
              <TableCell>{reservation.countryCode}</TableCell>
              <TableCell>{reservation.fClass}</TableCell>
              <TableCell>{reservation.noOfPassengers}</TableCell>
              <TableCell>
                <Button variant="outlined" color="error" 
                onClick={() => handleDelete(reservation._id)}
                >
                  Cancellation
                </Button>
                <Button variant="outlined" color="error" 
                onClick={() => handleDelete(reservation._id)}
                >
                  Update
                </Button>
                <Button variant="outlined" color="error" 
                onClick={() => handleDelete(reservation._id)}
                >
                  Pay now
                </Button>
              </TableCell>
            </TableRow>
            </TableBody>
  ))*/
  
  return (
    <Container>
      <Header />
      <Body>
      <div style={{ textAlign: 'center' }}>
        <input type="text" placeholder="Search..." />
      </div>
      <div><Button variant="outlined" color="error" onClick={generatePDF}>PDF</Button></div>
      <TableContainer>
        <div ref={componentPdf} style={{width:'100%'}}>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Flight Name</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Country Code</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Passenger Count</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation._id}>
              <TableCell>{reservation.flightName}</TableCell>
              <TableCell>{reservation.firstName}</TableCell>
              <TableCell>{reservation.lastName}</TableCell>
              <TableCell>{reservation.email}</TableCell>
              <TableCell>{reservation.phone}</TableCell>
              <TableCell>{reservation.country}</TableCell>
              <TableCell>{reservation.countryCode}</TableCell>
              <TableCell>{reservation.fClass}</TableCell>
              <TableCell>{reservation.noOfPassengers}</TableCell>
              <TableCell>
                <Button variant="outlined" color="error" 
                onClick={() => handleDelete(reservation._id)}
                >
                  Cancellation
                </Button>
                <Button variant="outlined" color="error">
                <Link 
                to ={`/update/${reservation._id}`}>
                Update
                </Link></Button>
                <Button variant="outlined" color="error">
                <NavLink to={'/payments'}>Pay Now</NavLink>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </TableContainer>

   
      </Body>
      <Footer/>
    </Container>
    
  )
}
export default Reservations;