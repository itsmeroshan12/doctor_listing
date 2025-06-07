// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
     <>
      <Navbar />
      <div className="container mt-5">
        <h1>Welcome to Doctor Directory</h1>
        <p>Search and list doctors, clinics, and hospitals near you.</p>

        <Link to="/clinics/add" className="btn btn-primary mt-3">
          ➕ Add Clinic
        </Link>
      </div>
    </>
  );
};

export default Home;
