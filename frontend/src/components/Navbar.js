import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaUserCircle, FaHeart } from 'react-icons/fa';
import './Navbar.css';
import Collapse from 'bootstrap/js/dist/collapse';
import axios from 'axios';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || 'User');
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for changes to login state from other components
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
      setFirstName(localStorage.getItem('firstName') || 'User');
    };

    // Listen for changes (like login/logout)
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });

      localStorage.removeItem("token");
      localStorage.removeItem("firstName");

      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleTogglerClick = () => {
    const nav = document.getElementById('navbarNav');
    const isOpen = nav.classList.contains('show');
    document.body.classList.toggle('nav-open', !isOpen);
  };

  const handleCloseMenu = () => {
    const nav = document.getElementById('navbarNav');
    const bsCollapse = new Collapse(nav, { toggle: false });
    bsCollapse.hide();
    document.body.classList.remove('nav-open');
  };

  return (
    <>
      <div className="mobile-backdrop" onClick={handleCloseMenu}></div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
        <Link className="navbar-brand fw-bold" to="/">DoctorDirectory</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          onClick={handleTogglerClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse mobile-slide" id="navbarNav">
          {window.innerWidth <= 991 && (
            <div className="d-flex justify-content-end mb-3">
              <button className="btn-close" onClick={handleCloseMenu}></button>
            </div>
          )}

          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle bg-transparent border-0"
                    id="dashboardDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ cursor: 'pointer' }}
                  >
                    My Dashboard
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dashboardDropdown" style={{ minWidth: '220px' }}>
                    <li className="dropdown-header d-flex align-items-center">
                      <FaUserCircle size={24} className="me-2" />
                      <div>
                        <small className="text-muted">Hello,</small>
                        <strong className="user-firstname">{firstName || 'User'}!</strong>
                      </div>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className="dropdown-item" to="/user/items" onClick={handleCloseMenu}>
                        My Listings
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/login" onClick={handleCloseMenu}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/register" onClick={handleCloseMenu}>Register</Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/hospitals" onClick={handleCloseMenu}>All Listings</Link>
            </li>

            {isLoggedIn && (
              <li className="nav-item">
                <button className="btn btn-outline-danger nav-link" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
