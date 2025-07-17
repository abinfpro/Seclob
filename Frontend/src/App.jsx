import React from "react";
import Signup from "./components/Signupage";
import Signin from "./components/Signinpage";
import Homepage from "./components/Homepage";
import Producrdetails from "./components/Productdetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/producrdetails/:id" element={<Producrdetails />}></Route>
        </Routes>
      </Router>
    </>
  );
}
