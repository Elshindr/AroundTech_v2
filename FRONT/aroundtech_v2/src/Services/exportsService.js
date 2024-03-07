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

console.log(` res export xls`, res)
                //return res.status===200;


                return res.blob();
            }).then(blob => {
                // Créer un objet URL à partir du blob
                const url = window.URL.createObjectURL(blob);
                // Créer un lien <a> pour le téléchargement
                const a = document.createElement('a');
                a.href = url;
                // Définir le nom du fichier de téléchargement
                a.download = 'mesprimes.xlsx';
                // Ajouter le lien au document
                document.body.appendChild(a);
                // Simuler un clic sur le lien pour démarrer le téléchargement
                a.click();
                // Nettoyer l'objet URL après le téléchargement
                window.URL.revokeObjectURL(url);

                  // Supprimer le lien <a> après le téléchargement
                  document.body.removeChild(a);
              })
            
            
            
            .catch((error) => {
                console.error("Erreur de la récupération des données 'mission'", error);
                throw new Error(error)
            });
    }

}