import { Injectable } from '@angular/core';
import { NatureInterface } from '../Interfaces/nature.interface';
import { ResponseInterface } from '../Interfaces/response.Interface';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserService } from './user.service';
import { BehaviorSubject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NatureService {

  private _baseUrl = environment.urlApi + "natures";
  private _subUser: Subscription;
  private _idUserCur: number = -1;
  public lstNatures$ = new BehaviorSubject<NatureInterface[]>([]);

  constructor(private _http: HttpClient, private _UserService: UserService) {
    this._subUser = _UserService.userCur$.subscribe(user => this._idUserCur = user.id);
  }

  public getlstNatures(): Promise<ResponseInterface>{

    this._idUserCur = 1; // TODO: Suppr



    console.log(`getlstNatures`, this._idUserCur)
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });

      this._http.get<NatureInterface[]>(this._baseUrl, { headers, withCredentials: true })
        .subscribe({
          next: (lstNatures: any) => {
            if (lstNatures === null || lstNatures === undefined) {
              console.log("non trouvé :: ", lstNatures);

              resolve({ obj: null, message: "Erreur : natures non trouvés", status: 333 });
            } else {
              console.log("trouvé lstNatures", lstNatures);
              this.lstNatures$.next(lstNatures);

              resolve({ obj: lstNatures, message: "ok", status: 200 });
            }
          },
          error: (error) => {
            console.error("Erreur lors de la requête: liste des Natures", error);
            resolve({ obj: error, message: "Erreur lors de la requete: liste des Natures", status: 400 });
          }
        });
    });
  }

}
