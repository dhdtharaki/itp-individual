import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
const Reservation = ({ flightName,firstName,lastName,email,phone,country,countryCode,fClass,noOfPassengers, userName, isUser, id }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myReservations/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/reservation/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/reservations"));
  };
  return (
    <div>
      {" "}
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
              className={classes.font}
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
            >
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          flightName={flightName}
        />

        <CardContent>
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>{"First Name"}</b> {": "} {firstName}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>{"Last Name"}</b> {": "} {lastName}
          </Typography>
        </CardContent>
        <CardContent>
          
        
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>{"Email"}</b> {": "} {email}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>{"Phone"}</b> {": "} {phone}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>{"Country"}</b> {": "} {country}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>{"Country Code"}</b> {": "} {countryCode}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>{"Class"}</b> {": "} {fClass}
          </Typography>
        </CardContent>
        <CardContent>

          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>{"Number Of Passengers"}</b> {": "} {noOfPassengers}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reservation;