import UserService from "./UserService";
export default class MotifService {

    static url = `${process.env.REACT_APP_BACK_URL}motifs`;

    static async loadNaturesExp() {
        //console.log(`url`, this.url)
        return fetch(this.url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
            },
        })
            .then(res => {
                return res.json();
            })
            .then(nat => {
                return nat;
            })
            .catch(error => {
                console.error("Erreur dans loadNaturesExp", error);
            });
    }

    static async addNatExpense(natExpense) {
        return fetch(`${this.url}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
                },
                credentials: 'include',
                method: "POST",
                body: JSON.stringify({ "name": natExpense.name, "capped": natExpense.capped, "valCap": natExpense.valCap })
            })
            .then((res) => {
                if (res.status === 200) {
                    return true;
                }

                throw new Error("addNatExpense" + res);
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans addExpense`, error);
                return false;
            });
    }


    static async updateNatExpense(natExpense) {

        return fetch(`${this.url}/${natExpense.id}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
                },
                method: "PUT",
                credentials: 'include', // Inclure les cookies si nécessaire
                body: JSON.stringify({ "name": natExpense.name, "capped": natExpense.capped, "valCap": natExpense.valCap })
            })
            .then((res) => {
                if (res.status === 200) {
                    return true;
                }

                throw new Error("updateNatExpense" + res);
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans updateNatExpense`, error);
                return false;
            });
    }

    static async deleteNatExpense(idNatExp, idUser) {

        return fetch(`${this.url}/${idNatExp}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
                },
                credentials: 'include',
                method: "DELETE",

            })
            .then(res => {

                if (res.status === 200) {
                    return true;
                }

                throw new Error("deleteNatExpense" + res);
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans deleteExpense`, error);
                return false;
            });
    }
}
