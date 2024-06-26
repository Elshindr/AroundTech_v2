
import { Component, Input, OnInit, OnDestroy, Directive, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MissionInterface, Mission } from 'src/app/Interfaces/mission.interface';
import { NatureInterface } from 'src/app/Interfaces/nature.interface';
import { NatureService } from 'src/app/Services/nature.service';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransportService } from 'src/app/Services/transport.service';
import { TransportInterface } from 'src/app/Interfaces/transport.interface';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, FormGroupDirective, NgModel, Validators } from '@angular/forms';
import Utils from 'src/app/Utils/utils';

import { MissionService } from 'src/app/Services/mission.service';
import { MissionComponent } from 'src/app/Pages/mission/mission.component';


@Component({
  selector: 'app-modal-mission-edit',
  templateUrl: './modal-mission-edit.component.html',
  styleUrls: ['./modal-mission-edit.component.css'],
})
export class ModalMissionEditComponent implements OnInit, OnDestroy {

  // Forms variables
  @ViewChild('formRef')
  formRef!: FormGroupDirective;
  isError: boolean = false;
  lblError: string = "";
  dtStartError: string = "";
  formData!: MissionInterface;

  minDateStart = Utils.formatDateToISO(new Date());
  missionForm!: FormGroup;


  // Modals variables
  lstNatures: NatureInterface[] = [];
  lstTransports: TransportInterface[] = [];
  lstSuggestions: string[] = [];
  cityTerm: string = "";
  @Input() lstMissions: MissionInterface[] = [];
  @Input() aMission: MissionInterface = Mission.getEmptyMission();
  parentComponent !: MissionComponent;
  titleBtnModal !: string;


  // TS variables
  private _subLstNatures !: Subscription;
  private _subLstTransports !: Subscription;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private _NatureService: NatureService, private _TransportService: TransportService, private _MissionService: MissionService) {
  }


  // Events Modal
  onOpenModal() {
    this.modalService.open(this);
  }

  onCloseModal() {
    this.modalService.dismissAll();
  }

  // Events Form
  customDateValidator(formControlName: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      let date: Date = new Date(control.value);

      //console.log(`control`, formControlName, date)
      return new Observable((observer) => {
        if (date.getFullYear() === 0) {
          observer.next({ invalidDateType: true });
        } else if (date < new Date()) {
          observer.next({ invalidDateToday: true });
        } else if (Utils.isWorkingDay(date)) {
          observer.next({ invalidDateHolid: true });
        } else if (formControlName === 'dateEnd' && date <= new Date(control.parent?.get('dateStart')?.value) ||
          formControlName === 'dateStart' && date >= new Date(control.parent?.get('dateEnd')?.value)
        ) {
          observer.next({ invalidDateOrder: true });
        } else {
          let lstMissionsByDate = this.lstMissions.filter(
            mis => new Date(mis.startDate) <= date && date <= new Date(mis.endDate)
          );

          if (lstMissionsByDate.length > 0) {
            observer.next({ invalidDateFull: true });
          } else {
            observer.next(null); // Date valide
          }
        }
        observer.complete();
      });
    };
  }


  onChangeDate(dateStart: NgModel, typeDate: string) {
    let date: Date = new Date(dateStart.model);

    if (date.getFullYear() !== 0) {
      this.dtStartError = "";
      return;
    }

    if (date < new Date()) {
      this.dtStartError = "Date inférieure à la date du jour.";
      return;
    }

    if (Utils.isWorkingDay(date)) {
      this.dtStartError = "Date sur un jour non travaillé.";
      return;
    }

    let lstMissionsByDate = this.lstMissions.filter(
      mis => new Date(mis.startDate) <= date && date <= new Date(mis.endDate)
    );

    if (lstMissionsByDate.length > 0) {
      this.dtStartError = "Date déjà prise par une mission.";
      return;
    }

    this.dtStartError = "";
  }


  async onChangeCity(event: Event) {

    const inputElement = event.target as HTMLInputElement;
    await fetch(
      `https://geo.api.gouv.fr/communes?nom=${inputElement.value}&boost=population&limit=5`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        this.lstSuggestions = data.map((feature: { nom: any; }) => feature.nom);
      })
      .catch((error) => console.log(error));

  }


  async onSubmitEditMission(event: Event) {

    //console.log(`submit addmission`, this.missionForm, event)
    if (this.lstMissions?.length > 0 && this.aMission.id === -1 && this.missionForm.valid) {


      //console.log(`la form est ok`, this.missionForm.value)

      const newMission: MissionInterface = {
        id: -1,
        userId: -1,
        startDate: this.missionForm.value.dateStart,
        endDate: this.missionForm.value.dateEnd,
        tjm: -1,
        natureCur: {
          id: this.missionForm.value.natureCur,
          name: "-1",
          charge: -1,
          bonus: false,
          tjm: -1,
          percentage: -1
        },
        natureInit: {
          id: this.missionForm.value.natureCur,
          name: "-1",
          charge: -1,
          bonus: false,
          tjm: -1,
          percentage: -1
        },
        departCity: { name: this.missionForm.value.departCity, id: -1 },
        arrivalCity: { name: this.missionForm.value.arrivalCity, id: -1 },
        transport: { name: "-1", id: this.missionForm.value.transport },
        status: { name: "", id: -1 },
        totalExpenses: -1,
        editable: false
      };

      const responseMission = await this._MissionService.postAddMission(newMission);

      if (responseMission.status === 200) {
        //console.log(`ok 200 responMission`, responseMission)

        this.parentComponent.reloadLstMissions();
        this.modalService.dismissAll();
        //this._NatureService.lstNatures$.subscribe(lstNatures => this.lstNatures = lstNatures);
      } else {
        console.log(`erreor responMission`, responseMission)
      }

    } else if (this.lstMissions?.length === 0 && this.aMission.id !== -1 && this.missionForm.valid) {


      //console.log(`la form est ok`, this.missionForm.value)

      const editMission: MissionInterface = this.aMission;
      editMission.startDate =  this.missionForm.value.dateStart;
      editMission.endDate =  this.missionForm.value.dateEnd;
      editMission.natureCur.id =  this.missionForm.value.natureCur;
      editMission.departCity.name =  this.missionForm.value.departCity;
      editMission.arrivalCity.name =  this.missionForm.value.arrivalCity;
      editMission.transport.id =  this.missionForm.value.transport;


      const responseMission = await this._MissionService.putUpdateMission(editMission);

      if (responseMission.status === 200) {
        //console.log(`ok 200 responMission`, responseMission)

        this.parentComponent.reloadLstMissions();
        this.modalService.dismissAll();
        //this._NatureService.lstNatures$.subscribe(lstNatures => this.lstNatures = lstNatures);
      } else {
        console.log(`erreor responMission`, responseMission)
      }

    } else {
      console.log("autre", this.lstMissions, this.aMission)
      Object.keys(this.missionForm.controls).forEach(field => {
        const control = this.missionForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }


  }




  // Hooks

  async ngOnInit(): Promise<void> {

    //this.formData = Mission.getEmptyMission();

    // FORM init
    this.missionForm = this.fb.group({
      dateStart: ['', Validators.required, this.customDateValidator("dateStart")],
      dateEnd: ['', Validators.required, this.customDateValidator("dateEnd")],
      natureCur: ['', Validators.required],
      departCity: ['', Validators.required],
      arrivalCity: ['', Validators.required],
      transport: ['', Validators.required],
    });


    // Datas init
    if (this.lstNatures?.length === 0) {
      const responseLstNature = await this._NatureService.getlstNatures();
      console.log(responseLstNature)
      if (responseLstNature.status === 200) {
        this._NatureService.lstNatures$.subscribe(lstNatures => this.lstNatures = lstNatures);
      }
    }


    if (this.lstTransports?.length === 0) {
      const responseLstTransports = await this._TransportService.getlstTransports();
      console.log(responseLstTransports)
      if (responseLstTransports.status === 200) {
        this._TransportService.lstTransports$.subscribe(lstTransports => this.lstTransports = lstTransports);
      }
    }
  }

  ngOnDestroy(): void {
    if (this._subLstNatures !== undefined) {

      this._subLstNatures.unsubscribe();
    }
    if (this._subLstTransports !== undefined) {

      this._subLstTransports.unsubscribe();
    }
    //throw new Error('Method not implemented.');
  }
}
