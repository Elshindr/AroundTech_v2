import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import style from "./MyCalendar.module.css";
import MissionService from "../../Services/missionService";
import LeaveService from "../../Services/leaveService";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enFR from "date-fns/locale/fr";

import CustomToolbar from "./CustomToolbar";
import ModalInformation from "./ModalPlanning";


import Utils from "../../Utils/utils";
import { useUser } from '../../Contexts/UserContext';
import { Error, Loading } from '../loadingError/loadingErrorComponent';

require("react-big-calendar/lib/css/react-big-calendar.css");

const locales = {
  "en-FR": enFR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const PlanningComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [missions, setMissions] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(undefined);
  const [modalState, setModalState] = useState(false);
  const newEventsList = [];

  // Utilisation du hook useUser
  const contextUser = useUser();
  const loading = contextUser.loading;
  const error = contextUser.error;

  // loading leaves et missions
  useEffect(() => {
    if (contextUser.user) {

      (async () => {
        const data_mission = await MissionService.loadMissionsByUser(contextUser.user.id);
        const data_leave = await LeaveService.loadLeaves();
        const status = [{ "id": 3, "name": "validé" }];
        //Retourne seulement les données sur l'utilisateur connecté et les congés validés
        const filteredLeaves = data_leave.filter(
          (leave) => leave.id_user === contextUser.user.id && leave.status === status[0].id
        );

        // Change id status by name
        const updatedLeaves = filteredLeaves.map((leave) => {
          return { ...leave, status: status[0].name };
        });
        setLeaves(updatedLeaves);

        // Retourne seulement les missions avec le status "validé"
        const filteredMissions = data_mission.filter(
          (mission) => mission.status.id === status[0].id
        );
        setMissions(filteredMissions);
      })();
    }
  }, [contextUser.user]);

  //Insert to calendar datas (leaves + missions)
  useEffect(() => {

    // Ajoute des missions à la liste
    missions.forEach((mission) => {
      const newEndDate = new Date(mission.endDate);
      newEndDate.setDate(newEndDate.getDate() );
      newEventsList.push({
        allDay: true,
        end: newEndDate,
        start: new Date(mission.startDate),
        title: mission.natureCur.name,
        categorie: "mission",
        color: "#a7a726",
      });
    });

    // Ajoute des congés à la liste
    leaves.forEach((leave) => {
      newEventsList.push({
        allDay: true,
        end: new Date(leave.end_date),
        start: new Date(leave.start_date),
        title: leave.label,
        categorie: "leave",
        color: "#6e6eeb",
      });
    });

    const holidays = Utils.listOfHoliday(currentDate);
    // Check if holidays already exist in newEventsList by title
    const holidaysExist = holidays.some((holiday) => {
      return newEventsList.some((event) => event.title === holiday.name);
    });

    if (!holidaysExist) {
      holidays.forEach((h) => {
        newEventsList.push({
          allDay: true,
          end: new Date(h.end),
          start: new Date(h.start),
          title: h.name,
          categorie: "holidays",
          color: "#2fad2f",
        });
      });
    }

    setEventsList(newEventsList);
  }, [missions, leaves, currentDate]);

  //Modal information
  const handleSelectedEvent = (event) => {
    setSelectedEvent(event);
    setModalState(true);
  };

  // Gérer l'état de chargement
  if (loading) {
    return <Loading />;
  }

  // Gérer l'état d'erreur
  if (error) {
    return <Error />;
  }

  return (
    <>
      <Calendar
        selectable
        onSelectEvent={(e) => handleSelectedEvent(e)}
        components={{
          toolbar: (toolbarProps) => (
            <CustomToolbar
              {...toolbarProps}
              date={currentDate}
              onNavigate={(year, month, day) => {
                setCurrentDate(new Date(year, month, day));
              }}
            />
          ),
        }}
        views={["month"]}
        localizer={localizer}
        events={eventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className={style.customCalendar}
        date={currentDate}
        onNavigate={(date) => {
          setCurrentDate(date);
        }}

        eventPropGetter={(eventsList) => {
          const backgroundColor = eventsList.color ? eventsList.color : "blue";
          return { style: { backgroundColor } };
        }}
      />
      {selectedEvent && (
        <ModalInformation
          show={modalState}
          information={selectedEvent}
          onHide={() => {
            setModalState(false);
          }}
        />
      )}
    </>
  );
};

export default PlanningComponent;
