import React, { useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Utils from "../../Utils/utils";

const MissionTable = ({ missions, leaves, setShowDeleteModal, setShowUpdateModal, setMission, setSelectedLeave, setModalState }) => {
  
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const maxPerPage = 5;

  const totalMission = missions.length;
  const totalLeaves = leaves.length;
  const totalDataLength = totalMission + totalLeaves;
  const totalPages = Math.ceil(totalDataLength / maxPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const lastIndex = currentPage * maxPerPage;
  const firstIndex = (currentPage - 1) * maxPerPage;
  const dataPageMission = missions.slice(firstIndex, lastIndex);
  const dataPageLeaves = leaves.slice(firstIndex, lastIndex);


  const handleOpenDeleteModal = (mission) => {
    setShowDeleteModal(true);
    setMission(mission);
  };

  const handleOpenUpdateModal = (mission) => {
    console.log(`updatemodale`, mission)
    setMission(mission);
    setShowUpdateModal(true);
  };

  // Modal information
  const handleSelectedLeave = (leave) => {
    setSelectedLeave(leave);
    setModalState(true);
  };

  return (
    <>
      <Table responsive hover id="table-mission">
        <thead>
          <tr>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Nature</th>
            <th>Départ</th>
            <th>Arrivée</th>
            <th>Transport</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {missions.length > 0 &&
            dataPageMission.map((mission) => {
              let actions_button = [];
              //Case where status is initiale or rejet
              let array_edit = ["initiale", "rejetée", "rejetee"];
              let stat_name = mission.status.name;
              let edit_statut = array_edit.some(
                (x) => x.toLowerCase() == stat_name.toLowerCase()
              )
                ? true
                : false;
              if (edit_statut) {
                actions_button.push(
                  <button
                    className="button_icon button_edit"
                    onClick={() => handleOpenUpdateModal(mission)}
                  >
                    <EditIcon className="icon_edit" id="edit_mission" />
                  </button>
                );
              }
              actions_button.push(
                <button
                  className="button_icon button_delete"
                  onClick={() => handleOpenDeleteModal(mission)}
                >
                  <DeleteIcon className="icon_delete" />
                </button>
              );

              return (
                <tr key={mission.id}>
                  <td>
                    {new Date(mission.startDate).toISOString().split("T")[0]}
                  </td>
                  <td>
                    {new Date(mission.endDate).toISOString().split("T")[0]}
                  </td>
                  <td>{mission.natureCur.name}</td>
                  <td>{mission.departCity.name}</td>
                  <td>{mission.arrivalCity.name}</td>
                  <td>{Utils.capitalizeFirstLetter(mission.transport.name)}</td>
                  <td>{Utils.capitalizeFirstLetter(mission.status.name)}</td>
                  <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                    {actions_button.map((action, index) => (
                      <span key={index}>{action}</span>
                    ))}
                  </td>
                </tr>
              );
            })}


          {leaves.length > 0 &&
            dataPageLeaves.map((leave) => {
              return (
                <tr key={leave.id}>
                  <td>{leave.start_date}</td>
                  <td>{leave.end_date}</td>
                  <td>{leave.label}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{leave.status}</td>
                  <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                    <button
                      className="button_icon button_edit"
                      key={leave.id_user}
                      onClick={() => handleSelectedLeave(leave)}
                      style={{ cursor: "pointer" }}
                    >
                      <VisibilityIcon className="icon_edit" id="view_mission" />
                    </button>
                  </td>
                </tr>
              );
            })
          }

          {
            missions.length === 0 && leaves.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center">
                  Aucun résultat
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>


      <div className="d-flex justify-content-center">
        <Pagination>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </>
  );
};

export default MissionTable;
