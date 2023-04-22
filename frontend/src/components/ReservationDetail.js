import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const ReservationDetail = () => {
  const navigate = useNavigate();
  const [reservation, setReservation] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/reservation/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setReservation(data.reservation);
      setInputs({
        flightName: data.reservation.flightName,
        firstName: data.reservation.firstName,
        lastName: data.reservation.lastName,
        email: data.reservation.email,
        phone: data.reservation.phone,
        country: data.reservation.country,
        countryCode: data.reservation.countryCode,
        fClass: data.reservation.fClass,
        noOfPassengers: data.reservation.noOfPassengers,
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/reservation/update/${id}`, {
        flightName: inputs.flightName,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        phone: inputs.phone,
        country: inputs.country,
        countryCode: inputs.countryCode,
        fClass: inputs.fClass,
        noOfPassengers: inputs.noOfPassengers,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(reservation);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myReservations/"));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h2"
              textAlign={"center"}
            >
              Add a Reservation
            </Typography>
            <InputLabel sx={labelStyles}>Flight Name</InputLabel>
            <TextField
              name="flightName"
              onChange={handleChange}
              value={inputs.flightName}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>First Name</InputLabel>
            <TextField
              name="firstName"
              onChange={handleChange}
              value={inputs.firstName}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Last Name</InputLabel>
            <TextField
              name="lastName"
              onChange={handleChange}
              value={inputs.lastName}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Email</InputLabel>
            <TextField
              name="email"
              onChange={handleChange}
              value={inputs.email}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Phone</InputLabel>
            <TextField
              name="phone"
              onChange={handleChange}
              value={inputs.phone}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Country</InputLabel>
            <TextField
              name="country"
              onChange={handleChange}
              value={inputs.country}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Country Code</InputLabel>
            <TextField
              name="countryCode"
              onChange={handleChange}
              value={inputs.countryCode}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Class</InputLabel>
            <TextField
              name="fClass"
              onChange={handleChange}
              value={inputs.fClass}
              margin="auto"
              variant="outlined"
            />
             <InputLabel sx={labelStyles}>Number Of Passengers</InputLabel>
            <TextField
              name="noOfPassengers"
              onChange={handleChange}
              value={inputs.noOfPassengers}
              margin="auto"
              variant="outlined"
            />
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Book
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default ReservationDetail;