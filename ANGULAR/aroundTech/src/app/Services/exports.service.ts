import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';
import { UserInterface } from '../Interfaces/userI.interface';
import { ResponseInterface } from '../Interfaces/response.Interface';

@Injectable({
	providedIn: 'root'
})
export class ExportsService {
	private _baseUrl: string = environment.urlApi + "exports";
	private _subUser: Subscription;
	private _idUserCur: number = -1;


	constructor(private _http: HttpClient, private _UserService: UserService) {
		this._subUser = _UserService.userCur$.subscribe(user => this._idUserCur = user.id);
	}


	public exportExpenseToPdf(idMission: number): Promise<ResponseInterface> {

		this._idUserCur = 1; // TODO: Suppr

		return new Promise((resolve, reject) => {
			const headers = new HttpHeaders({
				'Accept': 'application/json',
				'Content-type': 'application/json'
			});
			
			this._http.post(this._baseUrl + "/pdf", JSON.stringify({ "idUser": this._idUserCur, idMission: idMission }), { headers, responseType: "blob", withCredentials: true })
				.subscribe({
					next: (blob: Blob) => {
						if (blob === null || blob === undefined) {
							console.log(`non trouvé`, blob);
							resolve({ obj: null, message: "Erreur: à l'exportation", status: 333 });
						} else {
							console.log(`trouvé`, blob)
							const url = window.URL.createObjectURL(blob);
							const a = document.createElement('a');
							a.href = url;
							a.download = 'mesNotesDeFrais.pdf';
							document.body.appendChild(a);

							a.click();

							window.URL.revokeObjectURL(url);
							document.body.removeChild(a);
							resolve({ obj: blob, message: "ok", status: 200 })
						}
					},
					error: (error) => {
						console.error("Erreur lors de la requête", error);
						resolve({ obj: error, message: "Erreur lors de la requete", status: 400 });
					}
				})
		});
		/* return fetch(`${this.url}/pdf`,
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
			}); */
	}
}




/* static async exportPrimeToXls(idUser, jsonPrimes) {

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
 */



