import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import MissionService from "../../../Services/missionService";
import MissionForm from "./MissionForm";





export default function ModalMission(props) {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  //const [idUser, setIdUser] = useState(null);

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


    

  // Récupère l'id de l'utilisateur connecté
  // Charge les données utilisateur et appel fetchData
/*   useEffect(() => {

      //setIdUser(props.user.id);

    
  }, []);
 */
  const handleCloseModal = () => {
    props.onHide();
  };


  // if form error btn submir = disabled
  useEffect(() => {
    const isDisabled = Object.values(isAnError).some((value) => value === true);
    setIsButtonDisabled(isDisabled);
  }, [isAnError]);

  //loading formData when it's an update
  useEffect(() => {
    if (props.mission !== null) {

      (async () => {
        //const mission = await MissionService.loadOneMission(formData.user_id,props.id);
 /*        setFormData((prevState) => ({
          ...prevState,
          ["user_id"]: props.mission.userId,
        })); */
        setFormData({
          missionId: props.mission .id ? props.mission .id : "",
          nature_mission_id: props.mission .natureCur.id,
          departure_city_id: props.mission .departCity.name,
          arrival_city_id: props.mission .arrivalCity.name,
          start_date: new Date(props.mission .startDate).toISOString().split("T")[0],
          end_date: new Date(props.mission .endDate).toISOString().split("T")[0],
          bonus: 0,
          status_id: props.mission .status.id,
          user_id: props.mission .userId,
          transport_id: props.mission .transport.id,
        });
      })();

    } else {

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
    }
  }, [props.id, props.user.id]);

  const handleMission = async (e) => {
    e.preventDefault();

    //Ajout de la mission en BDD
    try {
      console.log(`form data`, formData)
      const response = await MissionService.addMission(formData);

      if (response ) {
        props.onHide(); //ferme la modal
        props.onReload(); //recharge le tableau

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
          user_id: props.user.id,
          transport_id: "",
        });
      } else {
        console.log(`Error! Status code: ${response}`)
        //window.alert(`Error! Status code: ${response}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateMission = async (e) => {
    e.preventDefault();

    //Ajout de la mission en BDD
    try {
      const response = await MissionService.updateMission(formData, props.id);
      if (response === 200) {
        props.onHide();


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
        {props.id !== null ? (
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
            onClick={handleMission}
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
