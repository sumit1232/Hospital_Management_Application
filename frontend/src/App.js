import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom';

import Appointments from './Components/Appointments';
import Doctors from './Components/Doctors';
import Patients from './Components/Patients';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1 style={{ color: "green", marginBottom: "20px", textAlign: "center" }}>
        Hospital Management App
        </h1>

        <nav>
          <ul>
            <li>
              <NavLink
                to="/appointments"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctors"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/patients"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Patients
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Appointments />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
