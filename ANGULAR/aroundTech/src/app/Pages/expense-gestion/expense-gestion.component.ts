import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MissionInterface } from 'src/app/Interfaces/mission.interface';
import { UserInterface } from 'src/app/Interfaces/userI.interface';
import { UserService } from 'src/app/Services/user.service';
import { MissionService } from './../../Services/mission.service';


@Component({
  selector: 'app-expense-gestion',
  templateUrl: './expense-gestion.component.html',
  styleUrls: ['./expense-gestion.component.css']
})
export class ExpenseGestionComponent implements OnInit, OnDestroy {


  // TS variables
  private _subUser!: Subscription;
  private _subLstMissions!: Subscription;

  // HTML variables
  userCur!: UserInterface;
  showTab: boolean = false;
  lstMissions: MissionInterface[] = [];


  constructor(private _UserService: UserService, private _MissionService: MissionService, private _router: Router) {
  }


  // Actions details
  onClickSee(idMission: number) {
    this._router.navigateByUrl("/missions/" + idMission);
  }

  onClickExportToPdf(idMission: number) {
    console.log(`exportToPdf`, idMission);
  }



  // Hooks


  async ngOnInit(): Promise<void> {

    this._subUser = this._UserService.userCur$.subscribe(user => {
      this.userCur = user;
    });


    const responseLstMissions = await this._MissionService.getlstMissionByOneUser();

    console.log(`resLstMissions in ExpenseGection`, responseLstMissions)

    if (responseLstMissions.status === 200 && responseLstMissions.obj != null) {
      this._subLstMissions = this._MissionService.lstMissions$.subscribe(mission => {
        this.lstMissions = mission;
      });

    } else {
      console.log(`fail response`, responseLstMissions)
    }

    console.log(`lstMissions`, this.lstMissions)
    this.showTab = this.lstMissions.length > 0 ? true : false;
  }

  ngOnDestroy(): void {
    this._subUser.unsubscribe();
    this._subLstMissions.unsubscribe();
  }
}
