import { EthProvider } from "./contexts/EthContext";
import SimpleMission from "./components/SimpleMission";
import ValidateMission from "./components/ValidateMission";
import EterniteePortal from "./components/EterniteePortal";
import React, {useState, useEffect } from 'react';



import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <EthProvider>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav container">

              <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'nav-item nav-link active' : 'nav-item nav-link'}>
                Create mission
              </NavLink>

              <NavLink
                to="/ValidateMission"
                className={({ isActive }) => isActive ? 'nav-item nav-link active' : 'nav-item nav-link '}>
                Validate mission
              </NavLink>

              <NavLink
                to="/EterniteePortal"
                className={({ isActive }) => isActive ? 'nav-item nav-link active' : 'nav-item nav-link '}>
                Eternitee Portal
              </NavLink>

            </div>
          </div>
        </nav>
        <div className="container pt-3">
          <Routes>
            <Route exact path="/" element={<SimpleMission />} />
            <Route exact path="/ValidateMission" element={<ValidateMission />} />
            <Route exact path="/EterniteePortal" element={<EterniteePortal />} />
          
          </Routes>
        </div>
      </Router>
    </EthProvider>
  );
}

export default App;

//Quickfix for terminal use, run in the project: export NODE_OPTIONS=--openssl-legacy-provider

