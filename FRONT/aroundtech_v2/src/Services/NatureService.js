import UserService from "./UserService";
export default class NatureMisService {

  static url = `${process.env.REACT_APP_BACK_URL}natures`;

  static async loadNaturesMis() {
    return fetch(this.url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
      },
    }).then((res) => {
      return res.json();
    }).then((nat) => {
      return nat;
    }).catch((error) => {
      console.error("Erreur dans loadNaturesMis", error);
    });
  }

  //pdf
  static async loadOneNatureMission(idNatureMis) {

    return fetch(`${this.url}/${idNatureMis}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
      },
    }).then((res) => {
      return res.json();
    }).then((exp) => {
      return exp;
    }).catch((error) => {
      console.error(
        "Erreur dans loadOnNatureMission idNatureMis =", idNatureMis, error);
    });
  }

  static async addNature(name, isCharge, isBonus, tjm, percentage, startDate, endDate) {

    return fetch(`${this.url}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
      },
      credentials: 'include',
      method: "POST",
      body: JSON.stringify({
        name: name,
        charge: isCharge,
        bonus: isBonus,
        tjm: tjm,
        percentage: percentage,
        startDate: startDate,
        endDate: endDate,
      }),
    }).then((res) => {
      if (res.status === 200) {
        return true;
      }
      throw new Error("addNature" + res);
    }).catch((error) => {
      console.log(`Error dans addNature`, error);
      return false;
    });
  }

  static async deleteNature(id) {
    return fetch(this.url + "/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
      },
      credentials: 'include',
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        return true;
      }
      throw new Error("deleteNature " + res);
    }).catch((error) => {
      console.log(`Error dans deleteNature `, error);
      return false;
    });
  }

  static async updateNature(id, name, isCharge, isBonus, tjm, percentage, startDate, endDate) {

    return fetch(this.url + "/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
      },
      credentials: 'include',
      method: "PUT",
      body: JSON.stringify({
        name: name,
        charge: isCharge,
        bonus: isBonus,
        tjm: tjm,
        percentage: percentage,
        startDate: startDate,
        endDate: endDate,
      }),
    }).then((res) => {
      if (res.status === 200) {
        return true;
      }
      throw new Error("updateNature " + res);
    }).catch((error) => {
      console.log(`Error dans updateNature !!!! `, error);
      return false;
    });
  }

  /**
   * Vérifie si une mission existe déjà pour la date en param
   * Format param : date type YYYY-MM-DD
   * Return array of nature_mission
   */
  static async selectedNatureFilterByDate(date) {

    return fetch(`${this.url}/byDate/${date}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    }).then((natures) => {
      return natures;
    }).catch((error) => {
      console.error(
        "Erreur de la récupération des données 'mission' dans selectedNatureFilterByDate",
        error
      );
    });
  }
}
