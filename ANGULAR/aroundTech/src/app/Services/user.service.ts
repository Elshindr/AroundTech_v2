import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from '../Interfaces/userI.interface';
import { environment } from 'src/environments/environment.development';
import { ResponseInterface } from '../Interfaces/response.Interface';
import { LoginInterface } from '../Interfaces/login.interface';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private _baseUrl = environment.urlApi + "login";
	
	public userCur$ = new BehaviorSubject<UserInterface>({
		id: -1,
		email: "-1",
		lastname: "-1",
		firstname: "-1",
		idManager: -1,
		idRole: -1,
		logged: false
	});

	constructor(private _http: HttpClient) { }

	public getOneUser(loginObj: LoginInterface) : Promise<ResponseInterface>  {

		return new Promise((resolve, reject) => {
			const headers = new HttpHeaders({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}); 

				this._http.post<Map<string, string>>(this._baseUrl, loginObj, { headers, withCredentials: true })
				.subscribe({
					next: (user: any) => {
						if (user === null || user === undefined || user?.id < 0) {
							console.log("non trouvé :: ", user);
							this.userCur$.value.logged = false;
							resolve({ obj: null, message: "Erreur : utilisateur non trouvé", status: 333 });
						} else {
							console.log("trouvé", user);
							this.userCur$.next(user);
							user.logged = true;
							resolve({ obj: this.userCur$, message: "ok", status: 200 });
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
