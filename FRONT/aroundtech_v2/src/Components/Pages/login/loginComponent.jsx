import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Col, Container, Form, Row, Image } from 'react-bootstrap';
import { Alert, TextField } from '@mui/material';
import logo from "../../../Assets/images/around-tech-logo.png";
import './login.css';
import userService from '../../../Services/UserService';
import { useUser } from '../../../Contexts/UserContext';

const LoginComponent = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(undefined);
  const router = useNavigate();

  // Utilisation du hook useUser
  const contextUser = useUser();
  const loading = contextUser.loading;


  const handleLogin = async (event) => {
    event.preventDefault();

    // Réinitialise l'erreur
    setError(undefined);

    try {

      const response = await userService.getOneUser(email, password);
      
      if (response.email !== "" && response.email !== undefined) {
        // Redirection vers la page d'accueil si la connexion est réussie
        contextUser.updateUser(response);
        router('/', { replace: true });

      } else {

        // Message d'erreur si la connexion échoue
        //const errorData = await response.json();
        const errorData = "Email ou mot de passe erronné";
        setError(errorData);
      }
    } catch (error) {
      // Gestion des erreurs lors de l'appel à l'API
      setError('Impossible de se connecter au serveur.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5 pt-5">
        <Col md={6} >
          <Card className="login_card">
            <Card.Body>
              <div className="d-flex justify-content-center pt-2">
                <Image
                  src={logo}
                  className="logo "
                  height={100}
                  width={100}
                  alt="Around Tech Logo"
                />
              </div>

              <h1>Gestion des missions</h1>
              <Form onSubmit={handleLogin}>
                <div >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Adresse email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="d-flex justify-content-center mt-4">
                    <Button type="submit" className="button_connect mb-3">
                      Se connecter
                    </Button>
                  </div>

                </div>
                {error !== undefined && <Alert severity="error">{error}</Alert>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
