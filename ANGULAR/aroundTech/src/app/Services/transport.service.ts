import { Injectable } from '@angular/core';
import { TransportInterface } from '../Interfaces/transport.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseInterface } from '../Interfaces/response.Interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  private _baseUrl = environment.urlApi + "transports";
  private _subUser: Subscription;
  private _idUserCur: number = -1;
  public lstTransports$ = new BehaviorSubject<TransportInterface[]>([]);

  constructor(private _http: HttpClient, private _UserService: UserService) {
    this._subUser = _UserService.userCur$.subscribe(user => this._idUserCur = user.id);
  }

  public getlstTransports(): Promise<ResponseInterface>{

    this._idUserCur = 1; // TODO: Suppr



    console.log(`getlstTransports`, this._idUserCur)
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });

      this._http.get<TransportInterface[]>(this._baseUrl, { headers, withCredentials: true })
        .subscribe({
          next: (lstTransports: any) => {
            if (lstTransports === null || lstTransports === undefined) {
              console.log("non trouvé :: ", lstTransports);

              resolve({ obj: null, message: "Erreur : transports non trouvés", status: 333 });
            } else {
              console.log("trouvé lstTransports", lstTransports);
              this.lstTransports$.next(lstTransports);

              resolve({ obj: lstTransports, message: "ok", status: 200 });
            }
          },
          error: (error) => {
            console.error("Erreur lors de la requête: liste des transports", error);
            resolve({ obj: error, message: "Erreur lors de la requete: liste des transports", status: 400 });
          }
        });
    });
  }
}
