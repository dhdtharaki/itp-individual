import Header from "./components/Header";
import Reservations from "./components/Reservations";
import UserReservations from "./components/UserReservations";
import ReservationDetail from "./components/ReservationDetail";
import AddReservation from "./components/AddReservation";

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
function App() {
  const dispath = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/reservations/add" element={<AddReservation />} />
              <Route path="/myReservations" element={<UserReservations />} />
              <Route path="/myReservations/:id" element={<ReservationDetail />} />{" "}
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;