import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddReservation = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    flightName: "",
    firstName: "",
    lastName: "",
    email:"", 
    phone:"",
    country:"",
    countryCode:"", 
    fClass:"", 
    noOfPassengers:"",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/reservation/add", {
        flightName: inputs.flightName,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        phone: inputs.phone,
        country: inputs.country,
        countryCode: inputs.countryCode,
        fClass: inputs.fClass,
        noOfPassengers: inputs.noOfPassengers,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/reservations"));
  };
  return (
    <div>
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
            className={classes.font}
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Add a Reservation
          </Typography>
          <InputLabel className={classes.font} sx={labelStyles}>
            Flight Name
          </InputLabel>
          <TextField
            className={classes.font}
            name="flightName"
            onChange={handleChange}
            value={inputs.flightName}
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            First Name
          </InputLabel>
          <TextField
            className={classes.font}
            name="firstName"
            onChange={handleChange}
            value={inputs.firstName}
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Last Name
          </InputLabel>
          <TextField
            className={classes.font}
            name="lastName"
            onChange={handleChange}
            value={inputs.lastName}
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Email
          </InputLabel>
          <TextField
            className={classes.font}
            name="email"
            onChange={handleChange}
            value={inputs.email}
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Phone
          </InputLabel>
          <TextField
            className={classes.font}
            name="phone"
            onChange={handleChange}
            value={inputs.phone}
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Country
          </InputLabel>
          <TextField
            className={classes.font}
            name="country"
            onChange={handleChange}
            value={inputs.country}
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Country Code
          </InputLabel>
          <TextField
            className={classes.font}
            name="countryCode"
            onChange={handleChange}
            value={inputs.countryCode}
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Class
          </InputLabel>
          <TextField
            className={classes.font}
            name="fClass"
            onChange={handleChange}
            value={inputs.fClass}
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Number of Passengers
          </InputLabel>
          <TextField
            className={classes.font}
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
    </div>
  );
};

export default AddReservation;