import React from 'react';
import { APP_NAME } from 'constants.js';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="text-center app-footer">
      &copy; {(new Date()).getFullYear()} - {APP_NAME}
    </footer>
  )
}

export default Footer;
