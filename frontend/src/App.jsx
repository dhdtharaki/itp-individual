import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddReservation from './pages/AddReservation';
import Reservations from './pages/Reservations';
import Flights from './pages/Flights';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/add-reservation' element={<AddReservation/>}/>
        <Route path='/reservations' element={<Reservations/>}/>
        <Route path='/flights' element={<Flights/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
