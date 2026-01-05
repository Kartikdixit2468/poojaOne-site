import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ConfirmBooking from "./pages/ConfirmBooking.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirm-booking" element={<ConfirmBooking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
