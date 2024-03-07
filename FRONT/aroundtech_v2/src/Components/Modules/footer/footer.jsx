
import React from 'react';
import {Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from "../../../Assets/images/around-tech-logo.png";
function Footer() {
  
  // Pour ajouter du css dynamique
  const pathname = useNavigate();

  // Obtient l'année courante
  const currentYear = new Date().getFullYear();

  return (
    <footer className= {`d-flex justify-content-center align-items-center border-top ${pathname === '/' ? 'footer-home' : ''}`}>
      <div>
        <a href="/" className="d-flex align-items-center justify-content-center link-body-emphasis text-decoration-none">
          <Image
            src={logo}
            className="logo"
            height={100}
            width={100}
            alt="Around Tech Logo"
          />
        </a>
        <span>Copyright © {currentYear} AroundTech. Tous droits réservés.</span>
      </div>
    </footer>
  );
}

export default Footer;