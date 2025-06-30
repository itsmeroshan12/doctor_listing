import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CheckEmail from './components/CheckEmail';
import VerifyEmail from './components/VerifyEmail';
import AddClinic from './components/AddListing';
import ClinicList from './components/ClinicList';
import MyListings from './pages/MyListings';
import ClinicDetails from './pages/ClinicDetails'; // 
import AddDoctor from './components/AddDoctor';
import DoctorList from './components/DoctorList';
import DoctorDetails from './pages/DoctorDetails'; // 



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/check-email" element={<CheckEmail />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password/:token" element={<ResetPassword />} />
        <Route path="/clinics/add" element={<AddClinic />} />
        <Route path="/clinics/list" element={<ClinicList />} />
        <Route path="/doctors/add" element={<AddDoctor />} />
        <Route path="/doctors/list" element={<DoctorList />} />
        <Route path="/user/items" element={<MyListings />} />

        <Route path="/clinics/:area/:category/:slug" element={<ClinicDetails />} />
        <Route path="/doctors/:area/:category/:slug" element={<DoctorDetails />} />

        {/* Optional catch-all redirect */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
