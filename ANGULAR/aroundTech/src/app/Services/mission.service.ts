import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { MissionInterface } from '../Interfaces/mission.interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseInterface } from '../Interfaces/response.Interface';
import { UserService } from './user.service';
import { UserInterface } from '../Interfaces/userI.interface';


@Injectable({
	providedIn: 'root'
})
export class MissionService {


	private _baseUrl = environment.urlApi + "missions";
	private _subUser: Subscription;
	private _idUserCur: number = -1;
	public lstMissions$ = new BehaviorSubject<MissionInterface[]>([]);

	constructor(private _http: HttpClient, private _UserService: UserService) {
		this._subUser = _UserService.userCur$.subscribe(user => this._idUserCur = user.id);
	}


	public getlstMissionByOneUser(): Promise<ResponseInterface> {
		this._idUserCur = 1; // TODO: Suppr
		console.log(`getlstMissionByOneUser`, this._idUserCur)
		return new Promise((resolve, reject) => {
			const headers = new HttpHeaders({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			});

			this._http.get<MissionInterface[]>(this._baseUrl + "/byUser/" + this._idUserCur, { headers, withCredentials: true })
				.subscribe({
					next: (lstMissions: any) => {
						if (lstMissions === null || lstMissions === undefined) {
							console.log("non trouvé :: ", lstMissions);

							resolve({ obj: null, message: "Erreur : utilisateur non trouvé", status: 333 });
						} else {
							console.log("trouvé", lstMissions);
							this.lstMissions$.next(lstMissions);

							resolve({ obj: lstMissions, message: "ok", status: 200 });
						}
					},
					error: (error) => {
						console.error("Erreur lors de la requête", error);
						resolve({ obj: error, message: "Erreur lors de la requete", status: 400 });
					}
				});
		});
	}

	public postAddMission(newMission :MissionInterface): Promise<ResponseInterface>{
		this._idUserCur = 1; // TODO: Suppr
		newMission.userId = this._idUserCur ;
		console.log(`newMission:::::::::::`, newMission)
		return new Promise((resolve, reject) => {
			const headers = new HttpHeaders({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			});

			this._http.post<MissionInterface[]>(this._baseUrl, newMission, { headers, withCredentials: true })
				.subscribe({
					next: (resp: any) => {
						if (resp === null || resp === undefined) {
							console.log("non trouvé :: ", resp);

							resolve({ obj: null, message: "Erreur : utilisateur non trouvé", status: 333 });
						} else {
							console.log("ajout ok", resp);
							//this.lstMissions$.next(lstMissions);

							resolve({ obj: resp, message: "ok", status: 200 });
						}
					},
					error: (error) => {
						console.error("Erreur lors de la requête", error);
						resolve({ obj: error, message: "Erreur lors de la requete", status: 400 });
					}
				});
		});
	}


	public dltDeleteMission(aMission :MissionInterface): Promise<ResponseInterface>{
		this._idUserCur = 1; // TODO: Suppr
		aMission.userId = this._idUserCur ;
		//console.log(`deleteission:::::::::::`, aMission.id)
		return new Promise((resolve, reject) => {
			const headers = new HttpHeaders({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			});

			this._http.delete<MissionInterface[]>(this._baseUrl+"/"+aMission.id,  { headers, withCredentials: true })
				.subscribe({
					next: (resp: any) => {
						if (resp === null || resp === undefined) {
							console.log("non trouvé :: ", resp);

							resolve({ obj: null, message: "Erreur : mission non trouvé", status: 333 });
						} else {
							console.log("deletion ok", resp);
							//this.lstMissions$.next(lstMissions);

							resolve({ obj: resp, message: "ok", status: 200 });
						}
					},
					error: (error) => {
						console.error("Erreur lors de la requête", error);
						resolve({ obj: error, message: "Erreur lors de la requete", status: 400 });
					}
				});
		});
	}


	public putUpdateMission(editMission :MissionInterface): Promise<ResponseInterface>{
		this._idUserCur = 1; // TODO: Suppr
		//editMission.userId = this._idUserCur ;
		console.log(`editMission:::::::::::`, editMission)
		return new Promise((resolve, reject) => {
			const headers = new HttpHeaders({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			});

			this._http.put<MissionInterface[]>(this._baseUrl, editMission, { headers, withCredentials: true })
				.subscribe({
					next: (resp: any) => {
						if (resp === null || resp === undefined) {
							console.log("non trouvé :: ", resp);

							resolve({ obj: null, message: "Erreur : utilisateur non trouvé", status: 333 });
						} else {
							console.log("edit ok", resp);
							//this.lstMissions$.next(lstMissions);

							resolve({ obj: resp, message: "ok", status: 200 });
						}
					},
					error: (error) => {
						console.error("Erreur lors de la requête", error);
						resolve({ obj: error, message: "Erreur lors de la requete", status: 400 });
					}
				});
		});
	}

}
