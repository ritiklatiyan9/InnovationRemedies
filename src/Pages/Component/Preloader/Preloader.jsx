import React, { useState, useEffect } from 'react';
import './preloader.css';

// Replace 'logo.png' with the path to your actual logo
import Logo from '../../../assets/Images/logo.png';

const Preloader = ({ setLoading }) => {
  useEffect(() => {
    // After 2 seconds, tell the parent component that loading is complete
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="preloader">
      <div className="logo-container ">
        <img  src={Logo} alt="Logo" className="zoom-logo h-full" />
      </div>
    </div>
  );
};

export default Preloader;