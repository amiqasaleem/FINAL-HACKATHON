// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Import the CSS file

const Navbar = () => {
  const token = localStorage.getItem("token"); // Check if token exists

  return (
    <div>
      <ul className='navbar'>
        <li><Link to="/" className='li-nav'>Home</Link></li>
        <li><Link to="/about" className='li-nav'>About</Link></li>
        <li><Link to="/contact" className='li-nav'>Contact</Link></li>
        {token ? (
          <>
            <li><Link to="/profile" className='li-nav'>Profile</Link></li>
            <li><Link to="/products" className='li-nav'>Products</Link></li>
            <li><button onClick={handleLogout} className='li-nav'>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className='li-nav'>Login</Link></li>
            <li><Link to="/signup" className='li-nav'>Sign Up</Link></li>
          </>
        )}
      </ul>
    </div>
  );

  function handleLogout() {
    localStorage.removeItem("token"); // Remove token from localStorage on logout
    window.location.href = "/"; // Redirect to homepage
  }
};

export default Navbar;
