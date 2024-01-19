export default class NatureMisService {
  static url = `${process.env.REACT_APP_BACK_URL}natures`;

  //
  static async loadNaturesMis() {
    return fetch(this.url)
      .then((res) => {
        return res.json();
      })
      .then((nat) => {
        return nat;
      })
      .catch((error) => {
        console.error("Erreur dans loadNaturesMis", error);
      });
  }

  //pdf
  static async loadOneNatureMission(idNatureMis) {
    let urlNat = `${this.url}/${idNatureMis}`;
    //console.log(`urlNat`, urlNat);

    return fetch(urlNat)
      .then((res) => {
        return res.json();
      })
      .then((exp) => {
        //console.log(`exp`, exp)
        return exp;
      })
      .catch((error) => {
        console.error(
          "Erreur dans loadOnNatureMission idNatureMis =", idNatureMis, error);
      });
  }

  static async addNature(name, isCharge, isBonus, tjm, percentage, startDate, endDate) {
    /*   console.log(
        JSON.stringify({
          name: name,
          charge: isCharge,
          bonus: isBonus,
          tjm: tjm,
          percentage: percentage,
          startDate: startDate,
          endDate: endDate,
        })
      ); */

    return fetch(`${this.url}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
    })
      .then((res) => {
        if (res.status === 200) {
          return true;
        }
        console.log(`erreur addNature`, res);
        throw new Error("addNature" + res);
      })
      .catch((error) => {
        console.log(`Error dans addNature`, error);
        return false;
      });
  }

  static async deleteNature(id) {
    return fetch(this.url + "/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) {
          return true;
        }

        console.log(`erreur deleteNature `, res);
        throw new Error("deleteNature " + res);
      })
      .catch((error) => {
        console.log(`Error dans deleteNature `, error);
        return false;
      });
  }

  static async updateNature(id, name, isCharge, isBonus, tjm, percentage, startDate, endDate) {
    
    return fetch(this.url + "/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
    })
      .then((res) => {
        if (res.status === 200) {
          return true;
        }
        console.log(`erreur dans la mise à jour `, res);
        throw new Error("updateNature " + res);
      })
      .catch((error) => {
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
    const urlUpdated = `${this.url}/date/${date}`;

    return fetch(urlUpdated)
      .then((res) => {
        return res.json();
      })
      .then((natures) => {
        return natures;
      })
      .catch((error) => {
        console.error(
          "Erreur de la récupération des données 'mission' dans selectedNatureFilterByDate",
          error
        );
      });
  }
}
