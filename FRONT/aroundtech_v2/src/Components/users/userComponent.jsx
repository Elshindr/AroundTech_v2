import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

import Utils from '../../Utils/utils';
import UserService from '../../Services/UserService';

import { useUser } from '../../Contexts/UserContext';
import { Error, Loading } from '../loadingError/loadingErrorComponent';


const UsersComponent = () => {

    const router = useNavigate();

    const [listeUser, setListeUser] = useState([]);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    // Utilisation du hook useUser
    const contextUser = useUser();
    const loading = contextUser.loading;
    const error = contextUser.error;

    useEffect(() => {
        (async () => {

            if (contextUser.user) {

                const dataLstUsers = await UserService.loadUsers();
                setListeUser(dataLstUsers);

            } else {
                console.log(`connnard usercomponent!!!!!!!!!!!!!!!!!!!!!!!!!!!`)
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


    const handleRedirect = () => {
        router('/users/add');
    };

    const deleteUser = async (e, idUser) => {

        e.preventDefault();

        try {
            const response = await UserService.deleteUser(idUser);

            if (response) {
                console.log(`response ok after submit`, response)
                setDeleteSuccess(true);

                const dataLstUsers = await UserService.loadUsers();
                setListeUser(dataLstUsers);

                setTimeout(()=>{
                    setDeleteSuccess(false);
                }, 2000);

                console.log("yes");

            } else {
                console.error('Erreur lors de la requête delete', response);
            }
        } catch (error) {
            console.error('Erreur lors de la requête delete :', error);
        }
    };



    return (
        <>      {deleteSuccess && (
                    <div className="update-success-message">
                        La mise à jour a été effectuée avec succès.
                    </div>
                )}
            <h1>Gestion Collaborateur</h1>
            <div className="d-flex flex-column justify-content-center my-4">
                <div className="text-center my-4 mx-4">
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Manager</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(listeUser === undefined || listeUser.length === 0) && (
                                <tr>
                                    <td colSpan={8} className="text-center">
                                        Aucun résultat
                                    </td>
                                </tr>
                            )}

                            {listeUser !== undefined && listeUser.length !== 0 && listeUser.map((user) => {

                                return (
                                    <tr key={user.id}>
                                        <td>
                                            {Utils.capitalizeFirstLetter(user.lastname)}
                                        </td>
                                        <td>
                                            {Utils.capitalizeFirstLetter(user.firstname)}
                                        </td>
                                        <td>
                                            {Utils.capitalizeFirstLetter(user.email)}
                                        </td>
                                        <td>
                                            {Utils.capitalizeFirstLetter(user.role.name)}
                                        </td>
                                        <td>
                                            {user.nameManager}
                                        </td>

                                        <td>
                                            <button className="button_icon button_edit" id={user.id} onClick={() => router(`/users/${user.id}`)}>
                                                <EditIcon className="icon_edit" />
                                            </button>
                                            <button className="button_icon button_delete" onClick={(e) => deleteUser(e, user.id)}>
                                                <DeleteIcon className="icon_delete" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <section className="d-flex justify-content-center mb-4">
                    <button className="button_add" onClick={handleRedirect}>Ajouter un Collaborateur : <AddCircleIcon /></button>
                </section>
            </div>
        </>
    );


}

export default UsersComponent;