export default class TransportService {

    static url = `${process.env.REACT_APP_BACK_URL}transports`;

    static async loadTransports() {
        return fetch(this.url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            return res.json();
        }).then(tra => {
            return tra;
        }).catch(error => {
            console.error("Erreur dans loadTransports", error);
        });
    }
}
