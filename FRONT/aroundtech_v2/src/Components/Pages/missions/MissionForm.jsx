import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import TransportService from "../../../Services/transportService";
import NatureMisService from "../../../Services/NatureService";
import Utils from "../../../Utils/utils";
import MissionService from "../../../Services/missionService";
import LeaveService from "../../../Services/leaveService";
import InfoIcon from "@mui/icons-material/Info";


const MissionForm = ({ formData, setFormData, isAnError, setIsAnError }) => {
  let initDate = new Date().toISOString().split("T")[0];
  const [natures, setNatures] = useState([]);
 // const [idStatusValid, setStatus] = useState(0);
  const [transports, setTransports] = useState([]);
  const [formMessage, setFormMessage] = useState({
    general: "",
    nature_mission_id: "",
    start_date: "",
    end_date: "",
    transport_id: "",
  });

  const inputTransport = useRef(null);


  useEffect(() => {
    (async () => {
      const datas_transport = await TransportService.loadTransports();
      if (datas_transport !== undefined) {
        setTransports(datas_transport);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {

        let isStartOk = false;
        let isEndOk = false;

        if (formData.start_date !== "") {
          isStartOk = await MissionService.selectedDateIsValid(formData.start_date, formData.user_id, formData.missionId);
          isStartOk = isStartOk ? await LeaveService.selectedDateIsValid(formData.start_date, formData.user_id, formData.missionId) : false;

          // il est interdit de créer une mission qui commence un jour d'une autre mission ou d'un congé
          if (!isStartOk) {
            setFormMessage((prevState) => ({
              ...prevState,
              ["start_date"]: isStartOk && isEndOk ? "" : "Date de début non valide, une mission ou un congé existe déjà à cette date.",
            }));
          }


          // il est interdit de créer une mission qui commence ou finit un jour non travaillé
          if (!Utils.isWorkingDay(new Date(formData.start_date))) {
            isStartOk = false;
            setFormMessage((prevState) => ({
              ...prevState,
              ["start_date"]: "Date non valide, une mission ne peut commencer un jour non travaillé.",
            }));
          }

          //une mission ne peut pas débuter le jour même, ni dans le passé
          if (isSameDay(new Date(formData.start_date), new Date(initDate)) || new Date(formData.start_date) < new Date(initDate)) {
            isStartOk = false;
            setFormMessage((prevState) => ({
              ...prevState,
              ["start_date"]: "La mission ne peut pas débuter le jour même ou dans le passé.",
            }));
          }

          setIsAnError((prevState) => ({
            ...prevState,
            ["start_date"]: !isStartOk,
          }));
        }

        if (formData.end_date !== "") {
          isEndOk = await MissionService.selectedDateIsValid(formData.end_date, formData.user_id, formData.missionId);
          isEndOk = isEndOk ? await LeaveService.selectedDateIsValid(formData.end_date, formData.user_id, formData.missionId) : false;

          if (!isEndOk) {
            setFormMessage((prevState) => ({
              ...prevState,
              ["end_date"]: "Date de fin non valide, une mission ou un congé existe déjà à cette date.",
            }));
          }

          // il est interdit de créer une mission qui commence ou finit un jour non travaillé
          if (!Utils.isWorkingDay(new Date(formData.end_date))) {
            isEndOk = false;
            setFormMessage((prevState) => ({
              ...prevState,
              ["end_date"]: "Date de fin non valide, une mission ne peut commencer un jour non travaillé.",
            }));
          }

          if (new Date(formData.end_date) < new Date(formData.start_date)) {
            isEndOk = false;
            setFormMessage((prevState) => ({
              ...prevState,
              ["end_date"]: "la date de fin doit être supérieure ou égale à la date de début.",
            }));
          }

          setIsAnError((prevState) => ({
            ...prevState,
            ["end_date"]: !isEndOk,
          }));
        }


        const datas_nature = await NatureMisService.selectedNatureFilterByDate(formData.start_date);
        setNatures(datas_nature);


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [formData.start_date, formData.end_date]);


  //Met à jour le formData après chaque saisie
  const handleForm = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  //Met à jour la date d'arrivée
  const handleChangeArrivalDate = (e) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      ["end_date"]: value,
    }));
    handleForm(e);
  };

  //Met à jour la date de départ
  const handleChangeStartedDate = (e) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      ["start_date"]: value,
    }));
    handleForm(e);
  };

  const isSameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth()
    );
  };

  // si le type de transport est l'avion, une anticipation de 7 jours est exigée:
  // date de début de mission >= date jour + 7 jours calendaires
  useEffect(() => {
    // Vérifie que avion est sélectionné
    //if (avionChoiceExist.length > 0) {
    if (inputTransport?.current?.value.toLowerCase() === "avion") {
      // Couleur de l'input change
      setIsAnError((prevState) => ({
        ...prevState,
        ["start_date"]: false,
        ["transport_id"]: false,
      }));
      // Affiche un message d'aide pour la saisie
      setFormMessage((prevState) => ({
        ...prevState,
        ["transport_id"]: "",
      }));


      if (formData.transport_id == 2 && formData.start_date !== "") {
        // Vérifie l'anticipation de 7 jours
        const currentDate = new Date();
        const currentDatePlus7Days = new Date(currentDate);
        currentDatePlus7Days.setDate(currentDate.getDate() + 7);

        if (new Date(formData.start_date) <= currentDatePlus7Days) {
          // Affiche un message d'aide pour la saisie
          setFormMessage((prevState) => ({
            ...prevState,
            ["transport_id"]: "La date de début ne respecte pas l'anticipation de 7 jours, pour le transport en avion.",
          }));
          // Couleur de l'input change
          setIsAnError((prevState) => ({
            ...prevState,
            ["transport_id"]: true,
            ["start_date"]: true,
          }));
        }
      }
    }

  }, [formData.start_date, formData.transport_id]);

  
    //Gestion Estimation de la prime
    useEffect(() => {
      if (formData.nature_mission_id !== "") {
        //Retourne seulement la nature sélectionnée
        const natureSelected = natures.filter(
          (nature) => nature.id === parseInt(formData.nature_mission_id)
        );
  
        if (natureSelected[0]) {
          const objMission = {"endDate":formData.end_date, "startDate":formData.start_date}
          const prime = Utils.getPrime(objMission, natureSelected[0]);
          setFormData((prevState) => ({
            ...prevState,
            ["bonus"]: prime,
          }));
        }
      }
    }, [
      formData.nature_mission_id,
      formData.start_date,
      formData.end_date,
      natures,
    ]);

  return (
    <div className="d-flex justify-content-center col-10 flex-column m-auto">
      {isAnError.general === true && (
        <div>
          <label style={{ color: "red" }}>{formMessage.general}</label>
        </div>
      )}

      {isAnError.start_date === true && (
        <div>
          <label style={{ color: "red" }}>{formMessage.start_date}</label>
        </div>
      )}

      <Form>
        <Form.Group controlId="start_date" className="d-flex mb-3">
          <Form.Label className="col-4 d-flex">Date de début</Form.Label>
          <Form.Control
            type="date"
            name="start_date"
            placeholder="Date de début"
            value={formData.start_date}
            onChange={handleChangeStartedDate}
            style={isAnError.start_date ? { border: "3px solid red" } : {}}
          />
        </Form.Group>

        {isAnError.end_date === true && (
          <div>
            <label style={{ color: "red" }}>{formMessage.end_date}</label>
          </div>
        )}
        <Form.Group controlId="end_date" className="d-flex mb-3">
          <Form.Label className="col-4 d-flex">Date de fin</Form.Label>
          <Form.Control
            type="date"
            name="end_date"
            placeholder="date de fin"
            value={formData.end_date}
            onChange={handleChangeArrivalDate}
            style={isAnError.end_date ? { border: "3px solid red" } : {}}
          />
        </Form.Group>

        <Form.Group
          controlId="nature_mission_id"
          className="d-flex mb-3"
          onChange={handleForm}
        >
          <Form.Label className="col-4 d-flex">
            Nature
            <button
              type="button"
              className="button_icon info-icon py-0"
              data-toggle="tooltip"
              data-placement="top"
              title="Sélectionner une date de départ pour connaître les natures disponibles"
            >
              <InfoIcon />
            </button>
          </Form.Label>
          <Form.Select
            aria-label="nature"
            name="nature_mission_id"
            value={formData.nature_mission_id || ""}
            onChange={handleForm}
          >
            <option value="" disabled>
              (Nature)
            </option>
            {natures.length > 0 &&
              natures.map((nature) => (
                <option key={nature.id} value={nature.id}>
                  {nature.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <AutoCompletionInput
          title="Ville de départ"
          name="departure_city_id"
          onChange={handleForm}
          defaultValue={formData.departure_city_id}
        />

        <AutoCompletionInput
          title="Ville d'arrivée"
          name="arrival_city_id"
          onChange={handleForm}
          defaultValue={formData.arrival_city_id}
        />

        {isAnError.transport_id === true && (
          <div>
            <label style={{ color: "red" }}>{formMessage.transport_id}</label>
          </div>
        )}
        <Form.Group
          controlId="transport_id"
          className="d-flex mb-3"
          onChange={handleForm}
        >
          <Form.Label className="col-4 d-flex">Transport</Form.Label>
          <Form.Select
            ref={inputTransport}
            aria-label="transport"
            name="transport_id"
            value={formData.transport_id || ""}
            style={isAnError.transport_id ? { border: "3px solid red" } : {}}
            onChange={handleForm}
          >
            <option value="" disabled>
              (Transport)
            </option>
            {transports.length > 0 &&
              transports.map((transport) => (
                <option key={transport.id} value={transport.id}>
                  {transport.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <div className="d-flex mb-3 justify-content-start">
          <span className="col-4 d-flex">Estimation prime</span>
          <span onChange={handleForm}>
            {formData.bonus ? formData.bonus : 0} €
          </span>
        </div>
      </Form>
    </div>
  );
};


export default MissionForm;

function AutoCompletionInput({ title, name, onChange, defaultValue }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSearchTerm(defaultValue);
  }, [defaultValue]);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    onChange(e);

    await fetch(
      `https://geo.api.gouv.fr/communes?nom=${query}&boost=population&limit=5`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const cities = data.map((feature) => feature.nom);
        setSuggestions(cities);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Form.Group className="d-flex mb-3" controlId={name}>
      <Form.Label className="col-4 d-flex"> {title} </Form.Label>
      <input
        className="form-control"
        type="text"
        placeholder={title}
        list={`citySuggestions-${name}`}
        value={searchTerm}
        name={name}
        id={name}
        onChange={handleSearchChange}
      />
      <datalist id={`citySuggestions-${name}`}>
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
    </Form.Group>
  );
}
