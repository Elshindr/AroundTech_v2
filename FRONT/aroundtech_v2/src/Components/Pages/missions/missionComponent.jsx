
import React, { useState, useEffect } from "react";
import MissionService from '../../../Services/missionService';
import LeaveService from "../../../Services//leaveService";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import MissionTable from "./MissionTable";
import ModalDeleteMission from "../../Modules/modals/ModalDeleteMission";
import ModalEditMission from "../../Modules/modals/ModalEditMission";
import ModalInformation from "../../Modules/modals/ModalInfosMission";

import { useUser } from '../../../Contexts/UserContext';
import { Error, Loading } from '../../Modules/loadingError/loadingErrorComponent';


const MissionComponent = () => {
  const [missions, setMissions] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [reloadTable, setReloadTable] = useState(true);

  const [mission, setMission] = useState(null);

  const [modalState, setModalState] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(undefined);

  // Utilisation du hook useUser
  const { user, loading, error } = useUser();

  useEffect(() => {

    (async () => {
      if (user) {
        if (reloadTable || user) {

          const data = await MissionService.loadMissionsByUser(user.id);
          setMissions(data);
          const datas = await LeaveService.loadLeaves();
          const status = [{ 'id': 3, 'name': "Validée" }];

          //Récupère seulement les données sur l'utilisateur connecté et dont le statut est validé
          const filteredLeaves = datas.filter(
            (leave) => leave.id_user === user.id && leave.status === status[0].id
          );

          //change id status by name
          const updatedLeaves = filteredLeaves.map((leave) => {
            return { ...leave, status: status[0].name };
          });
          setLeaves(updatedLeaves);
          setReloadTable(false);
        }
      } else {
        console.log(`nik missionComponent`)
      }
    })();
  }, [reloadTable, user]);


  // Gérer l'état de chargement
  if (loading) {
    return <Loading />;
  }

  // Gérer l'état d'erreur
  if (error) {
    return <Error />;
  }

  return (
    <div>
      <h1>Gestion des missions</h1>

      <div className="d-flex flex-column justify-content-center my-4">

        <div className="text-center my-4 mx-4">
          <MissionTable
            missions={missions}
            leaves={leaves}
            setShowDeleteModal={setShowDeleteModal}
            setShowUpdateModal={setShowUpdateModal}
            setMission={setMission}
            setSelectedLeave={setSelectedLeave}
            setModalState={setModalState}
          />
        </div>

        <div className="col-8 m-auto">
          <div className="d-flex justify-content-center">
            <button
              className="button_add"
              onClick={() => {
                setShowAddModal(true);
              }}
            >
              Demander une mission <AddCircleIcon />
            </button>
          </div>
        </div>

      </div>
      <ModalDeleteMission
        show={showDeleteModal}
        onHide={() => {
          setReloadTable(!reloadTable);
          setShowDeleteModal(false);
        }}
        mission={mission}
        title="Attention"
      />
      {user &&

        <ModalEditMission
          user={user}
          show={showAddModal}
          onHide={() => {
            setReloadTable(!reloadTable);
            setShowAddModal(false);
          }}
          mission={null}
          title="Demander une mission"
        />
      }


      {user && mission &&
        <ModalEditMission
          user={user}
          show={showUpdateModal}
          onHide={() => {
            setReloadTable(!reloadTable);
            setShowUpdateModal(false);
          }}
          mission={mission}
          title="Modifier une mission"
        />
      }


      {
        selectedLeave &&
        <ModalInformation
          show={modalState}
          information={selectedLeave}
          onHide={() => {
            setModalState(false);
          }}
        />
      }

    </div>
  );
};

export default MissionComponent;
