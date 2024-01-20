export default class StatusService {

  static url = `${process.env.REACT_APP_BACK_URL}status`;


  static async loadStatus() {
    
    return fetch(this.url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    }).then((status) => {
      return status;
    }).catch((error) => {
      console.error("Erreur dans loadStatus", error);
    });
  }


  static async loadStatusByName(name) {

    return fetch(`${this.url}/byName/${name}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    }).then((status) => {
      return status;
    }).catch((error) => {
      console.error("Erreur dans loadStatusByName", error);
    });
  }
}
