import React, { useEffect, useState } from "react";
import axios from "axios";
import Reservation from "./Reservation";

const Reservations = () => {
  const [reservations, setReservations] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/reservation")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setReservations(data.reservations));
  }, []);
  console.log(reservations);
  return (
    <div>
      {reservations &&
        reservations.map((reservation, index) => (
          <Reservation
            id={reservation._id}
            isUser={localStorage.getItem("userId") === reservation.user._id}
            flightName={reservation.flightName}
            firstName={reservation.firstName}
            lastName={reservation.lastName}
            email={reservation.email}
            phone={reservation.phone}
            country={reservation.country}
            countryCode={reservation.countryCode}
            fClass={reservation.fClass}
            noOfPassengers={reservation.noOfPassengers}
            userName={reservation.user.name}
          />
        ))}
    </div>
  );
};

export default Reservations;