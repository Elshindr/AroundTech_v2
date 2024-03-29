import UserService from "./UserService";

export default class ExpenseService {

    static url = `${process.env.REACT_APP_BACK_URL}expenses`;

    static async loadExpensesFromOneUser(idUser) {

        let urlP = `${this.url}/${idUser}`;
        return fetch(urlP, {
            method: 'GET',
            credentials: 'include', // Inclure les cookies si nécessaire
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                return res.json();
            })
            .then(exp => {
                return exp;
            })
            .catch(error => {
                console.error("Erreur dans loadExpensesFromOneMission idUser =", idUser, error);
            });
    }

    static async loadExpensesFromOneMission(idUser, idMission) {

        return fetch(`${this.url}/${idUser}/${idMission}`, {
            method: 'GET',
            credentials: 'include', // Inclure les cookies si nécessaire
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                return res.json();
            })
            .then(exp => {
                return exp;
            })
            .catch(error => {
                throw new Error("loadExpensesFromOneMission", error)
                //console.error("Erreur dans loadExpensesFromOneMission idMission =", idMission, error);
            });
    }

    static async addExpense(date, idMotif, amount, idMission) {

        return fetch(`${this.url}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
                },
                credentials: 'include',
                method: "POST",
                body: JSON.stringify({ "createdAt": date, "amount": parseFloat(amount), "idMission": idMission, "idMotif": idMotif })
            })
            .then((res) => {
                if (res.status === 200) {
                    return true;
                }

                throw new Error("add Expense" + res);
            })
            .catch(error => {
                throw new Error("addExpense", error)
            });
    }

    static async deleteExpense(idExp) {

        return fetch(`${this.url}/${idExp}`,
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

                throw new Error("remove Expense" + res);
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans deleteExpense`, error);
                return false;
            });
    }

    static async updateOneExpense(createdAt, idMotif, amount, idExp, validAt) {

        //console.log(createdAt, idMotif, amount, idExp, validAt)
        return fetch(`${this.url}/${idExp}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
                },
                credentials: 'include',
                method: "PUT",
                body: JSON.stringify({ "createdAt": createdAt, "valid_at": validAt, "amount": parseFloat(amount), "idMotif": idMotif })
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

    static async updateDateExpenses(idUser, idMission) {

        return fetch(`${this.url}/valid/${idMission}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
                },
                method: "PUT",
                credentials: 'include',
                body: JSON.stringify({ "idUser": idUser })
            })
            .then(res => {
                if (res.status === 200) {
                    return true;
                }

                throw new Error("updateValid Expense" + res);
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans updateExpense`, error);
                return false;
            });
    }

}
