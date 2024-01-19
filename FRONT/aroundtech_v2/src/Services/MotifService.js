export default class MotifService {

    static url = `${process.env.REACT_APP_BACK_URL}motifs`;

    static async loadNaturesExp() {
        console.log(`url`, this.url)
        return fetch(this.url)
            .then(res => {
                console.log(`res`, res)
                return res.json();
            })
            .then(nat => {
                console.log(`nat`, nat)
                return nat;
            })
            .catch(error => {
                console.error("Erreur dans loadNaturesExp", error);
            });
    }

    static async addNatExpense(natExpense){
        return fetch(`${this.url}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ "name": natExpense.name, "capped": natExpense.capped, "valCap": natExpense.valCap})
            })
            .then((res) => {
                if (res.status === 200){
                    return true;
                }

                throw new Error("addNatExpense" + res);
            })
            .catch(error => {// TODO: Gestion affichage de l'erreur
                console.log(`Error dans addExpense`, error);
                return false;
            });
    }


    static async updateNatExpense(natExpense){

        return fetch(`${this.url}/${natExpense.id}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method:"PUT",
                body: JSON.stringify({ "name": natExpense.name, "capped": natExpense.capped, "valCap": natExpense.valCap})
            })
            .then((res) => {
                if (res.status === 200){
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
                    "Content-Type": "application/json"
                },
                method: "DELETE",

            })
            .then(res => {

                if (res.status === 200){
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
