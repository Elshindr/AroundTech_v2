import UserService from "./UserService";
export default class ExportsService {

    static url = `${process.env.REACT_APP_BACK_URL}exports`;


    static async exportPrimeToXls(idUser, jsonPrimes) {

        return fetch(`${this.url}`,
            {
                credentials: 'include',
                method: "POST",
                body: JSON.stringify({ "idUser": idUser, primes: jsonPrimes }),
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
                },
            }).then((res) => {
                return res.status===200;
            }).catch((error) => {
                console.error("Erreur de la récupération des données 'mission'", error);
                throw new Error(error)
            });
    }

}