import React, { useState, useEffect } from "react";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import UpdateIcon from '@mui/icons-material/Update';
import { Table, Button, Pagination } from "react-bootstrap";
import MissionService from "../../../Services/missionService";

import { useUser } from '../../../Contexts/UserContext';
import { Error, Loading } from '../../Modules/loadingError/loadingErrorComponent';
import ConfirmationDialog from "../../Modules/modals/dialog/ConfirmationDialog";
import Utils from '../../../Utils/utils';

export default function MissionWaitingComponent() {

  // missions ayant le statut en attente (id = 2) // TODO à améliorer si temps
  const missionStatus = 2;
  const NOT_SPECIFIED = "Non spécifié";

  const [missions, setMissions] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);

  const [managerId, setManagerId] = useState(null);


  // Utilisation du hook useUser
  const contextUser = useUser();
  const loading = contextUser.loading;
  const error = contextUser.error;

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const maxPerPage = 5;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const lastIndex = currentPage * maxPerPage;
  const firstIndex = lastIndex - maxPerPage;
  const dataPageMission = [...missions].slice(firstIndex, lastIndex);
  const totalMission = missions.length;
  const totalPages = Math.ceil(totalMission / maxPerPage);

  // Charge les informations de l'utilisateur connecté
  useEffect(() => {
    if (contextUser.user && (contextUser.user.role.id === 2 || contextUser.user.role.id === 3)) {
      setManagerId(contextUser.user.id); // Met à jour l'ID du manager
    }
  }, [contextUser.user]);


  // Charge les missions une fois l'ID du manager défini
  useEffect(() => {
    if (managerId) {
      async function fetchMissions() {
        const missionsData = await MissionService.loadMissionsInWaitByManager(managerId);
        setMissions(missionsData);
      }
      fetchMissions();
    }
  }, [managerId, missionStatus]);


  // Fonction pour gérer la validation ou le rejet des missions
  const handleValidation = async (idMission, idNewStatus) => {
    try {
        const response = await MissionService.updateMissionStatus(idMission, idNewStatus);
        if(response){
          // Après la mise à jour, actualisation de la liste des missions
          const updatedMissions = await MissionService.loadMissionsInWaitByManager(managerId);
          setMissions(updatedMissions);
        } else{
          console.log(`Erreur in update status mission`, response);
        }

    } catch (error) {
      console.error("Erreur dans updateMissionStatus", error);
    }
  };

  // Fonctions pour ouvrir et fermer la boîte de dialogue de confirmation
  const handleOpenDialog = (missionId, statusId) => {
    setSelectedMission({ id: missionId, status: statusId });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedMission(null);
    setOpenDialog(false);
  };

  // Pour confirmer l'action de validation ou de rejet
  const handleConfirmAction = async () => {
    if (selectedMission) {
      await handleValidation(selectedMission.id, selectedMission.status);
    }
    handleCloseDialog();
  };

  // Gérer l'état de chargement
  if (loading) {
    return <Loading />;
  }

  /*     // Gérer l'état d'erreur
      if (error) {
        return <Error />;
      } */

  return (
    <>
      <h1 id="titleNature">Validations des missions</h1>

      

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
                <th className="table-subtitle">Actions</th>
              </tr>
            </thead>
            <tbody>

              {(dataPageMission === undefined || dataPageMission.length === 0) && (
                <tr>
                  <td colSpan={8} className="text-center">
                    Aucun résultat
                  </td>
                </tr>
              )}


              {dataPageMission.length > 0 && dataPageMission.map((mission) => (
                <tr key={mission.id}>
                  <td>{Utils.formatDateTimestampToStr(mission.startDate)}</td>
                  <td>{Utils.formatDateTimestampToStr(mission.endDate)}</td>
                  <td>{Utils.capitalizeFirstLetter(mission.natureCur?.name) || NOT_SPECIFIED}</td>
                  <td>{Utils.capitalizeFirstLetter(mission.departCity?.name) || NOT_SPECIFIED}</td>
                  <td>{Utils.capitalizeFirstLetter(mission.arrivalCity?.name) || NOT_SPECIFIED}</td>
                  <td>{Utils.capitalizeFirstLetter(mission.transport?.name) || NOT_SPECIFIED}</td>
                  <td >
                    <div className="button-container-gestion">
                      <button className="button_icon button_edit" onClick={() => handleOpenDialog(mission.id, 3)}>
                        <DoneIcon className="icon_edit" />
                      </button>
                      <button className="button_icon button_delete" onClick={() => handleOpenDialog(mission.id, 6)}>
                        <ClearIcon className="icon_delete" />
                      </button>
                    </div>

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


      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmAction}
        title={selectedMission && selectedMission.status === 3 ? "Valider la mission" : "Rejeter la mission"}
        message={selectedMission && selectedMission.status === 3 ? "Êtes-vous sûr de vouloir accepter cette mission ?" : "Êtes-vous sûr de vouloir rejeter cette mission ?"}
        confirmButtonText="Oui"
        cancelButtonText="Annuler"
      />
    </>
  )
}