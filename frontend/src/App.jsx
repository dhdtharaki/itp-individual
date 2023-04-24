import {Routes, Route} from 'react-router-dom'
import AddReservation from './pages/AddReservation';
import Reservations from './pages/Reservations';
import Flights from './pages/Flights';
import Auth from './pages/Auth';
import UpdateReservation from './pages/UpdateReservation';
function App() {
  return (
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/add-reservation' element={<AddReservation/>}/>
        <Route path='/update/:id' element={<UpdateReservation/>}/>
        <Route path='/reservations' element={<Reservations/>}/>
        <Route path='/flights' element={<Flights/>}/>
      </Routes>
  );
}

export default App;
