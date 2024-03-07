import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import MissionService from "../../../Services/missionService";
import MissionForm from "../../Pages/missions/MissionForm";



export default function ModalMission(props) {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [formData, setFormData] = useState({
    missionId: "",
    nature_mission_id: "",
    departure_city_id: "",
    arrival_city_id: "",
    start_date: "",
    end_date: "",
    bonus: 0,
    status_id: "",
    user_id: props.mission?.userId,
    transport_id: "",
  });

  const [isAnError, setIsAnError] = useState({
    general: false,
    nature_mission_id: false,
    start_date: false,
    end_date: false,
    transport_id: false,
  });


  // auto-complete formDate
  useEffect(() => {
    (async () => {
      setFormData({
        missionId: props.mission !== null ? props.mission.id : "",
        nature_mission_id: props.mission !== null ? props.mission.natureCur.id : "",
        departure_city_id: props.mission !== null ? props.mission.departCity.name : "",
        arrival_city_id: props.mission !== null ? props.mission.arrivalCity.name : "",
        start_date: props.mission !== null ? new Date(props.mission.startDate).toISOString().split("T")[0] : "",
        end_date: props.mission !== null ? new Date(props.mission.endDate).toISOString().split("T")[0] : "",
        bonus: 0,
        status_id: props.mission !== null ? props.mission.status.id : "",
        user_id: props.mission !== null ? props.mission.userId : props.user.id,
        transport_id: props.mission !== null ? props.mission.transport.id : "",
      });
    })();
  }, [props?.mission]);


  // if form error btn submir = disabled
  useEffect(() => {
    const isDisabled = Object.values(isAnError).some((value) => value === true);
    setIsButtonDisabled(isDisabled);
  }, [isAnError]);

  // Add mission in BDD
  const handleAddMission = async (e) => {
    e.preventDefault();


    try {

      const response = await MissionService.addMission(formData);

      if (response) {
        props.onHide(); //ferme la modal

        //clear le form
        setFormData({
          missionId: "",
          nature_mission_id: "",
          departure_city_id: "",
          arrival_city_id: "",
          start_date: "",
          end_date: "",
          bonus: 0,
          status_id: "",
          user_id: props.user?.id,
          transport_id: "" 
        });
      } else {
        console.log(`Error! Status code: ${response}`)
        window.alert(`Error! Status code: ${response}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update mission in BDD
  const handleUpdateMission = async (e) => {

    e.preventDefault();

    //Ajout de la mission en BDD
    try {
      const response = await MissionService.updateMission(formData, props.id);
      if (response) {
        props.onHide();

        // Clear le form
        setFormData({
          missionId: "",
          nature_mission_id: "",
          departure_city_id: "",
          arrival_city_id: "",
          start_date: "",
          end_date: "",
          bonus: 0,
          status_id: "",
          user_id: props.user.id,
          transport_id: "",
        });
      } else {
        window.alert(`Error! Status code: ${response}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title
          className="modal-header-title"
          id="contained-modal-title-vcenter"
        >
          {props.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center d-flex flex-column">
        <MissionForm
          formData={formData}
          setFormData={setFormData}
          isAnError={isAnError}
          setIsAnError={setIsAnError}
        />
      </Modal.Body>

      <Modal.Footer>
        {props.mission !== null ? (
          <Button
            className="btn-modal-success"
            onClick={handleUpdateMission}
            disabled={isButtonDisabled}
          >
            Modifier
          </Button>
        ) : (
          <Button
            className="btn-modal-success"
            onClick={handleAddMission}
            disabled={isButtonDisabled}
          >
            Valider
          </Button>
        )}

        <Button className="btn-modal-cancel" onClick={handleCloseModal}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
