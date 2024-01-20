
import React, { useState, useEffect } from "react";
import MissionService from '../../Services/missionService';
import LeaveService from "../../Services//leaveService";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import MissionTable from "./MissionTable";
import ModalDeleteMission from "./delete/ModalDeleteMission";
//import ModalAddMission from "./add/ModalMission";
import ModalEditMission from "./add/ModalMission";
import ModalInformation from "./information/ModalInformation";

import { useUser } from '../../Contexts/UserContext';
import { Error, Loading } from '../loadingError/loadingErrorComponent';
import Utils from '../../Utils/utils';

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
  const contextUser = useUser();
  const loading = contextUser.loading;
  const error = contextUser.error;


  useEffect(() => {

    (async () => {
      if (contextUser.user) {
        if (reloadTable || contextUser.user) {

          const data = await MissionService.loadMissionsByUser(contextUser.user.id);
          setMissions(data);
          const datas = await LeaveService.loadLeaves();
          const status = [{'id':3, 'name':"Validée"}];//await StatusService.loadStatusByName("valid");
          //Récupère seulement les données sur l'utilisateur connecté et dont le statut est validé
          const filteredLeaves = datas.filter(
            (leave) => leave.id_user === contextUser.user.id && leave.status === status[0].id
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
  }, [reloadTable, contextUser.user]);

  //loading leaves data
/*   useEffect(() => {
    (async () => {
      const datas = await LeaveService.loadLeaves();
      const status = {'id':3, 'name':"validée"}//await StatusService.loadStatusByName("valid");
      //Récupère seulement les données sur l'utilisateur connecté et dont le statut est validé
      const filteredLeaves = datas.filter(
        (leave) => leave.id_user === contextUser.user.id && leave.status === status[0].id
      );
      //change id status by name
      const updatedLeaves = filteredLeaves.map((leave) => {
        return { ...leave, status: status[0].name };
      });
      setLeaves(updatedLeaves);
    })();
  }, [contextUser.user]); */

  // Gérer l'état de chargement
  if (loading) {
    return <Loading />;
  }

/*   // Gérer l'état d'erreur
  if (error) {
    return <Error />;
  } */

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
            setSelectedLeave={setSelectedLeave}
            setModalState={setModalState}
            setMission={setMission}
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
        /*oreload={() => {
          setReloadTable(true);
        }}*/

        onHide={() => {
          setReloadTable(!reloadTable);
          setShowDeleteModal(false);
        }}
        mission={mission}
        title="Attention"
      />

      <ModalEditMission
        user ={contextUser.user}
        show={showAddModal}
        /*onReload={() => {
          setReloadTable(true);
        }}*/
     
        onHide={() => {
          setReloadTable(!reloadTable);
          setShowAddModal(false);
        }}
        mission={null}
        title="Demander une mission"
      />


      <ModalEditMission
        user = {contextUser.user}
        show = {showUpdateModal}
       /* onReload={() => {
          setReloadTable(true);
        }}*/
        onHide={() => {
          setReloadTable(!reloadTable);
          setShowUpdateModal(false);
        }}
        mission={mission}
        title="Modifier une mission"
      />


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
