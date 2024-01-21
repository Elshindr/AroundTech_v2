import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import UserService from '../../../Services/UserService';
import { useUser } from '../../../Contexts/UserContext';
import { Error, Loading } from '../../loadingError/loadingErrorComponent';
import './UserFormUpdate.css'


const UserFormUpdate = () => {

	const [updateSuccess, setUpdateSuccess] = useState(false);
	const [roles, setRoles] = useState([]);
	const [lstManager, setLstManager] = useState([]);
	const [user, setUser] = useState({});

	const [firstNameValue, setFirstNameValue] = useState("");
	const [lastNameValue, setLastNameValue] = useState("");
	const [emailValue, setEmailValue] = useState("");
	const [idManagerValue, setIdManagerValue] = useState("");
	const [idRoleValue, setIdRoleValue] = useState("");
	const [pwdValue, setPwdValue] = useState("");

	const [formData, setFormData] = useState({
		firstname: firstNameValue,
		lastname: lastNameValue,
		email: emailValue,
		password: pwdValue,
		idRole: idRoleValue,
		idManager: idManagerValue,
	});

	// Utilisation du hook useUser
	const contextUser = useUser();
	const loading = contextUser.loading;
	const error = contextUser.error;
	const router = useNavigate();
	const { idUser } = useParams();

	useEffect(() => {
		(async () => {
			if (contextUser.user) {
				const dataRoles = await UserService.loadRoles();
				setRoles(dataRoles)
				const dataLstManager = await UserService.loadManagers();
				setLstManager(dataLstManager);
				const dataUser = await UserService.loadOneUser(idUser);
				setUser(dataUser);

				setFirstNameValue(dataUser.firstname);
				setLastNameValue(dataUser.lastname);
				setEmailValue(dataUser.email);
				setIdManagerValue(dataUser.idManager);
				setIdRoleValue(dataUser.role.id);
				setFormData({
					firstname: dataUser.firstname,
					lastname: dataUser.lastname,
					email: dataUser.email,
					password: '',
					idRole: dataUser.role.id,
					idManager: dataUser.idManager,
				})
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
		try {
			const response = await UserService.updateUser(formData, idUser);
			if (response) {

				setUpdateSuccess(true);
				setTimeout(() =>{
					router('/users');
				}, 3000);


			} else {
				console.error('Erreur lors de la requête put', response);
			}
		} catch (error) {
			console.error('Erreur lors de la requête put :', error);
		}
	};



	return (
		<div>
			{updateSuccess && (
				<div className="update-success-message">
					La mise à jour a été effectuée avec succès.
				</div>
			)}


			<h1>Mettre a jour l'utilisateur : </h1>

			{user !== undefined &&
				<Form onSubmit={handleSubmit}>

					<Form.Group controlId="firstname" className="d-flex mb-3">
						<Form.Label className="col-3">Prénom</Form.Label>
						<Form.Control
							type="text"
							name="firstname"
							placeholder="Prénom"
							value={firstNameValue}

							onChange={(e) => {
								setFirstNameValue(e.target.value);
								handleChange(e);
							}}
							required
						/>
					</Form.Group>
					<Form.Group controlId="lastname" className="d-flex mb-3">
						<Form.Label className="col-3">Nom</Form.Label>
						<Form.Control
							type="text"
							name="lastname"
							placeholder="Nom"
							value={lastNameValue}
							onChange={(e) => {
							setLastNameValue(e.target.value);
							handleChange(e);
						}}
						/>
					</Form.Group>

					<Form.Group controlId="email" className="d-flex mb-3">
						<Form.Label className="col-3">E-mail</Form.Label>
						<Form.Control
							type="email"
							name="email"
							placeholder="email@example.com"
							value={emailValue}
							onChange={(e) => {
							setEmailValue(e.target.value);
							handleChange(e);
						}}
						/>
					</Form.Group>

					<Form.Group controlId="password" className="d-flex mb-3">
						<Form.Label className="col-3">Mot de passe</Form.Label>
						<Form.Control
							type="password"
							name="password"
							placeholder="Mot de passe"
							value={pwdValue}
							onChange={(e) => {
								setPwdValue(e.target.value);
								handleChange(e);
							}}
						/>
					</Form.Group>

					<Form.Group
						controlId="idRole"
						className="d-flex mb-3"
						onChange={handleChange}
					>
						<Form.Label className="col-3">Role</Form.Label>
						<Form.Select
							aria-label="role"
							name="idRole"
							value={idRoleValue}
							onChange={(e) => {
								setIdRoleValue(e.target.value);
								handleChange(e);
							}}
						>
							<option value="" disabled>
								--- Selectionner un rôle ---
							</option>
							{roles.length > 0 &&
								roles.map((r) => {
									return (
										<option key={r.id} value={r.id}>
											{r.name}
										</option>
									);
								})}
						</Form.Select>
					</Form.Group>

					<Form.Group
						controlId="idManager"
						className="d-flex mb-3"
						onChange={handleChange}
					>
						<Form.Label className="col-3">Manager</Form.Label>
						<Form.Select
							aria-label="Manager"
							name="idManager"
							value={idManagerValue}
							onChange={(e) => {
								setIdManagerValue(e.target.value);
								handleChange(e);
							}}
						>
							<option value="" disabled>
								--- Selectionner un Manager ---
							</option>
							{lstManager.length > 0 && lstManager.map((mn) => {

								return (
									<option key={mn.id} value={mn.id}>
										{mn.firstname + " " + mn.lastname}
									</option>
								);

							})}


						</Form.Select>
					</Form.Group>

					<Button className="button_add" type="submit" onClick={handleSubmit} >
						Mettre à jour
					</Button>

				</Form>
			}
		</div>

	);
}

export default UserFormUpdate
