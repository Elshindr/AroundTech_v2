import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom'
import { Nav, NavDropdown, Navbar, Image } from 'react-bootstrap';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import useUserData from '../../../Contexts/useUserData';
import { useUser } from '../../../Contexts/UserContext';

import logo from "../../../Assets/images/around-tech-logo.png";
import { Error } from '../../loadingError/loadingErrorComponent';
import { Loading } from './../../loadingError/loadingErrorComponent';
import UserService from '../../../Services/UserService';

function Header(props) {

  // Utilisation du hook useUser
  const contextUser = useUser();
  const loading = contextUser.loading;
  const error = contextUser.error;


  const userName = contextUser.user !== null && contextUser?.user !== undefined ? `${contextUser.user.firstname}` : "Utilisateur";
  const router = useNavigate();
  const pathname = props.location;

  // Gère la déconnexion de l'utilisateur
  const handleLogout = async () => {


    console.log(`user?`, contextUser.user);
    const response = await UserService.getLogout();
    console.log(`logoutrespo,nse`, response)

    if (response) {
      router('/login', { replace: true });
    } else {
      console.error('Échec de la déconnexion');
    }
  };

  // Pour gérer l'état d'erreur
  if (error) {
    return <Error />;
  }

  // Fonction qui détermine si le chemin actuel est l'un des chemins du NavDropdown
  const isDropdownActive = () => {
    return ['/nature', '/motif'].includes(pathname);
  };

  return (
    <header className="header">
      <Navbar collapseOnSelect expand="xxl" data-bs-theme="light" className="justify-content-center px-2">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Navbar.Brand href="/">
            <Image
              src={logo}
              className="logo"
              height={100}
              width={100}
              alt="Around Tech Logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto justify-content-between align-items-center w-100 nav">
            <div className="d-flex col-10 justify-content-start">
              <Nav className={`link ${pathname === '/' ? 'active' : ''}`}><NavLink className="nav-link" to="/">Accueil</NavLink></Nav>
              <Nav className={`link ${pathname === '/missions' ? 'active' : ''}`}><NavLink className="nav-link" to="/missions">Gestion des missions</NavLink></Nav>
              <Nav className={`link ${pathname === '/planning' ? 'active' : ''}`}><NavLink className="nav-link" to="/planning">Planning des missions</NavLink></Nav>
              <Nav className={`link ${pathname === '/primes' ? 'active' : ''}`}><NavLink className="nav-link" to="/primes">Primes</NavLink></Nav>
              <Nav className={`link ${pathname === '/expenses' ? 'active' : ''}`}><NavLink className="nav-link" to="/expenses">Note de frais</NavLink></Nav>
              {
                (contextUser.user && (contextUser.user.role.id === 2 || contextUser.user.role.id === 3)) &&
                <Nav className={`link ${pathname === '/mission/waiting' ? 'active' : ''}`}><NavLink className="nav-link" to="/mission/waiting">Validation des missions</NavLink></Nav>
              }
              {
                contextUser.user && contextUser.user.role.id === 3 && (
                  <NavDropdown title="Natures" className={`link ${isDropdownActive() ? 'active' : ''}`}>
                    <NavLink className="nav-link" to="/natures">Nature de mission</NavLink>
                    <NavLink className="nav-link" to="/motifs">Nature de frais</NavLink>
                  </NavDropdown>
                )
              }
              {
                contextUser.user && contextUser.user.role.id === 3 &&
                <Nav className={`link ${pathname === '/users' ? 'active' : ''}`}><NavLink className="nav-link" to="/users">Gestions des utilisateurs</NavLink></Nav>
              }
            </div>
            <div className="d-flex col-2 justify-content-end">
              <Nav className="account-link" onClick={(e) => { e.preventDefault(); handleLogout(); }}><NavLink className="nav-link" to="#"><span className="account-icon mx-2"><AccountCircleIcon />{userName}</span><LogoutIcon className="logout-icon" /></NavLink></Nav>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>

  );
}

export default Header;