export default class StatusService {

  static url = `${process.env.REACT_APP_BACK_URL}status`;


  static async loadStatus() {
    return fetch(this.url)
      .then((res) => {
        return res.json();
      })
      .then((status) => {
        return status;
      })
      .catch((error) => {
        console.error("Erreur dans loadStatus", error);
      });
  }


  static async loadStatusByName(name) {

    return fetch(`${this.url}/byName/${name}`)
      .then((res) => {
        return res.json();
      })
      .then((status) => {
        return status;
      })
      .catch((error) => {
        console.error("Erreur dans loadStatusByName", error);
      });
  } 
}
