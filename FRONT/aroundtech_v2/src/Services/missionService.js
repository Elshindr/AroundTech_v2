import UserService from "./UserService";
export default class MissionService {


  static url = `${process.env.REACT_APP_BACK_URL}missions`;


  static async loadMissionsByUser(idUser) {

    let urlUpdated = `${this.url}/byUser/${idUser}`;

    return fetch(urlUpdated,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        return res.json();
      })
      .then((missions) => {
        return missions;
      })
      .catch((error) => {
        console.error("Erreur de la récupération des données 'mission'", error);
      });
  }


  static async loadOneMission(idUser, idMission) {

    return fetch(`${this.url}/${idUser}/${idMission}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
       // console.log(`res`, res)
        return res.json();
      })
      .then((mis) => {
        //console.log(`mis`, mis)
        return mis;
      })
      .catch((error) => {
        console.error("Erreur dans loadOneMission", error);
      });
  }


  // Recupération des missions pour les managers
  static async loadMissionsInWaitByManager(idUser) {

    return fetch(`${this.url}/byManager/${idUser}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        return res.json();
      })
      .then((missions) => {
        return missions;
      })
      .catch((error) => {
        console.error("Erreur de la récupération des données 'mission' dans loadMissionsInWaitByManager:", error);
      });
  }


  // Mise à jour du statut de la mission
  static async updateMissionStatus(idMission, idNewStatus) {

    return fetch(`${this.url}/status/${idMission}`,
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
        },
        credentials: 'include',
        method: "PUT",
        body: JSON.stringify({ "idStatus": idNewStatus })
      })
      .then(res => {
        if (res.status === 200) {
          return true;
        }

        throw new Error("update Expense" + res);
      })
      .catch(error => {// TODO: Gestion affichage de l'erreur
        console.log(`Error dans updateExpense`, error);
        return false;
      });
  }


  static async updateMission(formData) {

    const missionDto = {
      "id": formData.missionId,
      "departCity": { "id": "", "name": formData.departure_city_id },
      "arrivalCity": { "id": "", "name": formData.arrival_city_id },
      "natureInit": { "id": formData.nature_mission_id, "name": "" },
      "natureCur": { "id": formData.nature_mission_id, "name": "" },
      "startDate": formData.start_date,
      "endDate": formData.end_date,
      "userId": formData.user_id,
      "transport": { "id": formData.transport_id, "name": "" },
      "status": { "id": formData.status_id, "name": "" },
    }

    return fetch(this.url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
      },
      method: "PUT",
      credentials: 'include',
      body: JSON.stringify(missionDto),
    })
      .then((response) => {
        return response.status === 200;
      })
      .catch((error) => {
        console.error(error);
      });
  }


  static async addMission(formData) {

    const missionDto = {
      "id": formData.id,
      "departCity": { "id": "", "name": formData.departure_city_id },
      "arrivalCity": { "id": "", "name": formData.arrival_city_id },
      "natureInit": { "id": formData.nature_mission_id, "name": "" },
      "natureCur": { "id": formData.nature_mission_id, "name": "" },
      "startDate": formData.start_date,
      "endDate": formData.end_date,
      "userId": formData.user_id,
      "transport": { "id": formData.transport_id, "name": "" },
      "status": { "id": formData.status_id, "name": "" },
    }

    return fetch(this.url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
      },
      credentials: 'include',
      method: "POST",
      body: JSON.stringify(missionDto),
    })
      .then((response) => {
        if (response.status === 200) {
          return true;

        }
        return false;
      })
      .catch((error) => {
        console.error(error);
      });
  }


  static async deleteMission(idMission) {
    return fetch(`${this.url}/${idMission}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
      },
      credentials: 'include',
      method: "DELETE",
    })
      .then((res) => {
        return res.status === 200;
      })
      .catch((error) => {
        console.log(`Error dans deleteMission`, error);
        return false;
      });
  }


  static async loadMissionsEnded() {
    let urlUpdated = `${this.url}`;

    return fetch(urlUpdated, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((missions) => {
        return missions;
      })
      .catch((error) => {
        console.error("Erreur de la récupération des données 'missions' dans loadMissionsEnded", error);
      });
  }


  /**
   * Vérifie si une mission existe déjà pour la date en param
   * Si existe deja et que idMission est fourni (update) vérifie si la mission trouvée est la meme
   * Si la date est disponible renvoi true. Sinon false
   * Format param : date type YYYY-MM-DD
   * Return boolean
   */
  static async selectedDateIsValid(date, idUser, idMission) {


    return fetch(`${this.url}/isMissionExist`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
      },
      body: JSON.stringify({ "date": date, "idUser": idUser, "idMission": idMission })
    })
      .then((res) => {
        console.log(`selectedDateIsValid`, res)

        if (res.status === 200) { //la date est valide car elle n'existe pas dans la BDD
          return true;
        } else if (res.status === 204) {  // une mission existe déjà pour cette date
          return false;
        }

        throw new Error(res);
      })
      .catch((error) => {
        console.error("Erreur de la récupération des données 'mission' dans selectedDateIsValid", error);
      });

  }
}