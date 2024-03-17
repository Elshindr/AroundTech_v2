import UserService from "./UserService";
export default class ExportsService {

    static url = `${process.env.REACT_APP_BACK_URL}exports`;


    static async exportPrimeToXls(idUser, jsonPrimes) {

        return fetch(`${this.url}/xls`,
            {
                credentials: 'include',
                method: "POST",
                body: JSON.stringify({ "idUser": idUser, primes: jsonPrimes }),
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
                },
            }).then((res) => {

                if (!res.ok) {
                    throw new Error('Une erreur s\'est produite lors du téléchargement du fichier.');
                }

                return res.blob();
            }).then(blob => {
                // objet URL à partir du blob
                const url = window.URL.createObjectURL(blob);
                // lien <a> pour le téléchargement
                const a = document.createElement('a');
                a.href = url;
                a.download = 'mesprimes.xlsx';
                document.body.appendChild(a);

                // Simuler le clic du téléchargement
                a.click();

                // Nettoyage
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch((error) => {
                console.error("Erreur de la récupération des données 'primes'", error);
                throw new Error(error)
            });
    }






    static async exportExpenseToPdf(idUser, missionId){
        return fetch(`${this.url}/pdf`,
        {
            credentials: 'include',
            method: "POST",
            body: JSON.stringify({ "idUser": idUser, idMission: missionId }),
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': UserService.getCookie("XSRF-TOKEN"),
            },
            responseType: 'blob'
        }).then((res) => {

            //return res.status===200;

            return res.blob();
        }).then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'mesNotesDeFrais.pdf';
            document.body.appendChild(a);

            a.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch((error) => {
            console.error("Erreur de la récupération des données 'mission'", error);
            throw new Error(error)
        });
    }
}