import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import App from "./App";
import Register from "./components/Register";
import PopupBuyTurn from "./components/PopupBuyTurn";

const MainApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/payment_success" element={<PopupBuyTurn />} />
        <Route path="/payment_cancel" element={<PopupBuyTurn />} />
      </Routes>
    </Router>
  );
};

export default MainApp;
