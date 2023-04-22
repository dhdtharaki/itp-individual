import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import { Body, Input } from './AddReservation'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Footer from '../components/Footer';
import { Button } from '@mui/material';
import axios from 'axios';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const TableContainer = styled.div`
  margin: 90px 0;
`
const Search = styled.div`
  display: flex;
  justify-content: end;
`

const Reservations = () => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <Container>
      <Header />
      <Body>
      <TableContainer>
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
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Body>
      <Footer/>
    </Container>
  )
}

export default Reservations