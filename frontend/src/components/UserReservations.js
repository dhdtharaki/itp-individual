import React, { useEffect, useState } from "react";
import axios from "axios";
import Reservation from "./Reservation";
const UserReservations = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/reservation/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  console.log(user);
  return (
    <div>
      {" "}
      {user &&
        user.reservations &&
        user.reservations.map((reservation, index) => (
          <Reservation
            id={reservation._id}
            key={index}
            isUser={true}
            flightName={reservation.flightName}
            firstName={reservation.firstName}
            lastName={reservation.firstName}
            email={reservation.email}
            phone={reservation.phone}
            country={reservation.country}
            countryCode={reservation.countryCode}
            fClass={reservation.fClass}
            noOfPassengers={reservation.noOfPassengers}

            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserReservations;