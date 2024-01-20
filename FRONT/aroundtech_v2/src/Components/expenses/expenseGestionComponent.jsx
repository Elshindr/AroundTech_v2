import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Table, Pagination } from 'react-bootstrap';


import MissionService from '../../Services/missionService';
import NatureMisService from '../../Services/NatureService';
import ExpenseService from '../../Services/ExpenseService';
import { exportToPDF } from '../../Services/pdfService';

import { useUser } from '../../Contexts/UserContext';
import { Error, Loading } from '../loadingError/loadingErrorComponent';

import Utils from '../../Utils/utils';
import "./expense.css";


export default function ExpenseGestionComponent() {

    const [missions, setMissions] = useState([]);
    const [lstExpenses, setLstExpenses] = useState([]);
    const router = useNavigate();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const maxPerPage = 5;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const lastIndex = currentPage * maxPerPage;
    const firstIndex = lastIndex - maxPerPage;
    const dataPageExpense = [...missions].slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(missions.length / maxPerPage);

    // Utilisation du hook useUser
    const contextUser = useUser();
    const loading = contextUser.loading;
    const error = contextUser.error;


    // Charge les données utilisateur et appel fetchData
    useEffect(() => {
        (async () => {
            if (contextUser?.user?.id) {
                const missionsData = await MissionService.loadMissionsByUser(contextUser.user.id);
                setMissions(missionsData);
                const expensesData = await ExpenseService.loadExpensesFromOneUser(contextUser.user.id);
                setLstExpenses(expensesData);
            }
        })()
    }, [contextUser.user]);

    // Redirige vers la page de gestion des dépenses pour une mission donnée
    const redirectToExpensePage = (missionId) => {
        router(`/expenses/${missionId}`, { replace: true });
    };

    // Gére l'exportation des données au format PDF
    const handleExportToPDF = async (event) => {
        const missionId = event.currentTarget.getAttribute("data-mission-id");

        if (!contextUser.user.id) {
            console.error("L'ID de l'utilisateur n'est pas défini");
            return;
        }

        // Récupération des frais associés à la mission et à l'utilisateur
        const mission = await MissionService.loadOneMission(contextUser.user.id, missionId);
        const expenses = await ExpenseService.loadExpensesFromOneMission(contextUser.user.id, missionId);
        console.log(`mission`,mission)
        const natureInit = await NatureMisService.loadOneNatureMission(mission.natureInit.id);

        // Génération du PDF
        exportToPDF(mission, expenses, natureInit);
    };



    // Pour gérer l'état de chargement
    if (loading) {
        console.log(`loading`, loading)
        return <Loading />;
    }

         // Pour gérer l'état d'erreur
        if (error) {
            console.log(`error`, error)
            return <Error />;
        } 

    const NOT_SPECIFIED = "Non spécifié";


    return (
        <> 
            <h1>Gestion des notes de frais</h1>
            <div className="d-flex flex-column justify-content-center my-4">
                <div className="text-center my-4 mx-4">
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th className="table-subtitle">Date de début</th>
                                <th className="table-subtitle">Date de fin</th>
                                <th className="table-subtitle">Nature</th>
                                <th className="table-subtitle">Départ</th>
                                <th className="table-subtitle">Arrivée</th>
                                <th className="table-subtitle">Transport</th>
                                <th className="table-subtitle">Frais</th>
                                <th className="table-subtitle">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPageExpense.map(mission => (
                                <tr key={mission.id}>
                                    <td>{Utils.formatDateTimestampToStr(mission.startDate)}</td>
                                    <td>{Utils.formatDateTimestampToStr(mission.endDate)}</td>
                                    <td>{Utils.capitalizeFirstLetter(mission.natureCur.name) || NOT_SPECIFIED}</td>
                                    <td>{Utils.capitalizeFirstLetter(mission.departCity.name) || NOT_SPECIFIED}</td>
                                    <td>{Utils.capitalizeFirstLetter(mission.arrivalCity.name) || NOT_SPECIFIED}</td>
                                    <td>{Utils.capitalizeFirstLetter(mission.transport.name) || NOT_SPECIFIED}</td>
                                    <td>{Utils.formatAmount(lstExpenses
                                        // Filtre pour avoir les dépenses de la mission actuelle
                                        .filter(expense => expense.mission.id === mission.id)
                                        // Somme tous les montants des dépenses de cette mission sinon 0
                                        .reduce((acc, expense) => acc + expense.amount, 0)) || 0}€</td>

                                    <td >
                                        {/* Si date de fin < à date du jour alors les boutons s'affichent */}

                                        { Utils.compareDateStr(mission.endDate) && (
                                            <div className="button-container-gestion">
                                                <button className="button_icon button_gestion" onClick={() => redirectToExpensePage(mission.id)}>
                                                    <AddCircleIcon />
                                                </button>
                                                <button className="button_icon button_pdf" data-mission-id={mission.id} onClick={handleExportToPDF}>
                                                    <PictureAsPdfIcon />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-center">
                        <Pagination>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                </div>
            </div>
        </>
    );
}