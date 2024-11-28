import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./assets/components/Pages/Login/Login";
import Signup from "./assets/components/Pages/Signup";
import CreateBook from "./assets/components/Pages/CreateBook";
import BookDashboard from "./assets/components/Pages/BookDashboard";
import AuthLayout from "./assets/components/Layouts/AuthLayout";
import DashboardLayout from "./assets/components/Layouts/DashboardLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* we want to protect these routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/BookDashboard" element={<BookDashboard />} />
          <Route path="/create-book" element={<CreateBook />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
