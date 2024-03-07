import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import UserService from '../../../../Services/UserService';
import { useUser } from '../../../../Contexts/UserContext';
import { Error, Loading } from '../../../Modules/loadingError/loadingErrorComponent';
import './UserFormAdd.css'


const UserFormAdd = () => {
  const [addSuccess, setAddSuccess] = useState(false);
  const [role, setRole] = useState([]);
  const [listeUser, setListeUser] = useState([]);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    idRole: '',
    idManager: '',
  });

  // Utilisation du hook useUser
  const contextUser = useUser();
  const loading = contextUser.loading;
  const error = contextUser.error;
  const router = useNavigate();

  useEffect(() => {
    (async () => {
      if (contextUser.user) {
        const roles = await UserService.loadRoles();
        setRole(roles)
        const data = await UserService.loadUsers();
        setListeUser(data);
      }
    })();
  }, [contextUser.user]);


  // Gérer l'état de chargement
  if (loading) {
    return <Loading />;
}

/*     // Gérer l'état d'erreur
    if (error) {
        console.log(`error in saisiExpense`, error)
        return <Error />;
    }  */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await UserService.addUser(formData);

    if (response) {
      setAddSuccess(true);

      setTimeout(()=>{
        router('/users');
      }, 2000);
      

    } else {
      console.error('Erreur lors de la requête POST', response);
    }

  };


  return (
    <div>
      {addSuccess && (
        <div className="update-success-message">
          La mise à jour a été effectuée avec succès.
        </div>
      )}

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="firstname" className="d-flex mb-3">
          <Form.Label className="col-3">Prénom</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            placeholder="Prénom"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="lastname" className="d-flex mb-3">
          <Form.Label className="col-3">Nom</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            placeholder="Nom"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="d-flex mb-3">
          <Form.Label className="col-3">E-mail</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="d-flex mb-3">
          <Form.Label className="col-3">Mot de passe</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="idRole" className="d-flex mb-3" onChange={handleChange} required>
          <Form.Label className="col-3">Role</Form.Label>
          <Form.Select aria-label="role" name="idRole" defaultValue="">
            <option value="" disabled>
              --- Selectionner un rôle ---
            </option>
            {role.length > 0 &&
              role.map(r => {
                return (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                );
              })}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="idManager" className="d-flex mb-3" onChange={handleChange} required>
          <Form.Label className="col-3">Manager</Form.Label>
          <Form.Select aria-label="Manager" name="idManager" defaultValue="">
            <option value="" disabled>
              --- Selectionner un Manager ---
            </option>
            {listeUser.map(user => {
              if (user.role.id === 2) {
                return (
                  <option key={user.id} value={user.id}>
                    {user.firstname + " " + user.lastname}
                  </option>
                );
              }
              return null;
            })}


          </Form.Select>
        </Form.Group>

        <Button className="button_add" type="submit">
          Valider
        </Button>

      </Form>
    </div>

  );
};

export default UserFormAdd;
