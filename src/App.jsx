import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";
import SeatUI from "./pages/SeatUI";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/seat-ui" element={<SeatUI />} />
      </Routes>
    </BrowserRouter>
  );
}
