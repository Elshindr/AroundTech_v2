import CityService from "./cityService";
import UserService from "./UserService";
export default class MissionService {


  static url = `${process.env.REACT_APP_BACK_URL}missions`;

  static async loadMissionsByUser(idUser) {

    //let urlUpdated = `${this.url}/${idUser}`;
    let urlUpdated = `${this.url}/byUser/${idUser}`;
    //console.log(`url`, urlUpdated)
    return fetch(urlUpdated, {
      method: 'GET',
      credentials: 'include', // Inclure les cookies si nécessaire
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((missions) => {
        //console.log(`lstmission`, missions)
        return missions;
      })
      .catch((error) => {
        console.error("Erreur de la récupération des données 'mission'", error);
      });
  }

  static async loadOneMission(idUser, idMission) {
    //let url = `${this.url}/${idUser}/${idMission}`;
    let url = `${this.url}/${idUser}/${idMission}`;
    //console.log(`loadOneMission url`, url)
    return fetch(url, {
      method: 'GET',
      credentials: 'include', // Inclure les cookies si nécessaire
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        console.log(`res`, res)
        return res.json();
      })
      .then((mis) => {
        console.log(`mis`, mis)
        return mis;
      })
      .catch((error) => {
        console.error("Erreur dans loadOneMission", error);
      });
  }

  // Recupération des missions pour les managers
  static async loadMissionsInWaitByManager(idUser) {

    let urlUpdated = `${this.url}/byManager/${idUser}`;
    return fetch(urlUpdated, {
      method: 'GET',
      credentials: 'include', // Inclure les cookies si nécessaire
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((missions) => {
        // console.log(`loadMissionsInWaitByManager:`, missions)
        return missions;
      })
      .catch((error) => {
        console.error("Erreur de la récupération des données 'mission' dans loadMissionsInWaitByManager:", error);
      });
  }

  // Mise à jour du statut de la mission
  static async updateMissionStatus(idMission, idNewStatus) {
   // console.log(idMission, idNewStatus)
    //console.log(JSON.stringify({ "idStatus": idNewStatus }))
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



  static async updateMission(formData, idMission) {
    //Verification si les villes existent
    if (formData.departure_city_id !== "") {
      const departureCityPromise = this.city(formData.departure_city_id);

      const departure_city_id = await departureCityPromise;
      formData.departure_city_id = departure_city_id;
    } else {
      //return error message
      console.log(
        "Aucune ville de départ saisie"
      );
    }

    if (formData.arrival_city_id !== "") {
      const arrivalCityPromise = this.city(formData.arrival_city_id);

      const arrival_city_id = await arrivalCityPromise;
      formData.arrival_city_id = arrival_city_id;
    } else {
      //return error message
      console.log(
        "Aucune ville d'arrivée saisie"
      );
    }

    let url = `${this.url}/update/${idMission}`;

    return fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      credentials: 'include',
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.status;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static async addMission(formData) {

    //Verification si les villes existent
    if (formData.departure_city_id !== "") {
      const departureCityPromise = this.city(formData.departure_city_id);

      const departure_city_id = await departureCityPromise;
      formData.departure_city_id = departure_city_id;
    } else {
      //return error message
      console.log(
        "Aucune ville de départ saisie"
      );
    }

    if (formData.arrival_city_id !== "") {
      const arrivalCityPromise = this.city(formData.arrival_city_id);

      const arrival_city_id = await arrivalCityPromise;
      formData.arrival_city_id = arrival_city_id;
    } else {
      //return error message
      console.log(
        "Aucune ville d'arrivée saisie"
      );
    }

    return fetch(this.url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
      },
      credentials: 'include',
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.status;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static async city(nameOfCity) {
    let idCity;
    const response = await CityService.loadCitiesFilterByName(nameOfCity);
    if (response.length === 0) {
      //Insert new city
      const addCityResponse = await CityService.addCity(nameOfCity);
      if (addCityResponse.ok) {
        const response = await CityService.loadCitiesFilterByName(nameOfCity);
        idCity = response[0].id;
      } else {
        console.log("erreur lors de l'ajout de la ville de départ");
      }
    } else {
      //City exists
      idCity = response[0].id;
    }

    return idCity;
  }

  static async deleteMission(idMission) {
    return fetch(`${this.url}/delete/${idMission}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
      },
      credentials: 'include',
      method: "DELETE",
    })
      .then((res) => {
        return true;
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
      credentials: 'include', // Inclure les cookies si nécessaire
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
   * Si existe deja et que idMission est fourni (update) vérifie si la mission trouvé est la meme
   * Format param : date type YYYY-MM-DD
   * Return boolean
   */
  static async selectedDateIsValid(date, idUser, idMission) {
    const urlUpdated = `${this.url}/byUser/${idUser}/byDate/${date}/byMission`;

    return fetch(urlUpdated, {
      method: 'GET',
      credentials: 'include', // Inclure les cookies si nécessaire
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(`selectedDateIsValid`, res)
        //la date est valide car elle n'existe pas dans la BDD
        if (Object.keys(res).length === 0) {
          return true;
        } else {
          //une mission existe déjà pour cette date

          //Dans le cas d'un update, vérifier que l'idMission est celui returner dans la requete
          if (idMission !== res[0].id) {
            return true;
          } else {
            return false;
          }

        }
      })
      .catch((error) => {
        console.error("Erreur de la récupération des données 'mission' dans selectedDateIsValid", error);
      });

  }




  /**
* Vérifie si une mission existe déjà pour la date en param
* Format param : date type YYYY-MM-DD
* Return boolean
*/
  static async coupleOfDatesIsValid(startedDate, arrivalDate, idUser, idMission) {
    const urlUpdated = `${this.url}/user/${idUser}/twoDates/${startedDate}/${arrivalDate}`;

    return fetch(urlUpdated, {
      method: 'GET',
      credentials: 'include', // Inclure les cookies si nécessaire
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((missions) => {
        //la date est valide car elle n'existe pas dans la BDD
        if (Object.keys(missions).length === 0) {
          return true;
        } else {
          //une mission existe déjà pour cette date
          if (idMission !== missions[0].id) {
            return true;
          } else {
            return false;
          }
        }
      })
      .catch((error) => {
        console.error("Erreur de la récupération des données 'mission' dans coupleOfDatesIsValid", error);
      });

  }


}
