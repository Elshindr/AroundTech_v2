import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalMissionNewComponent } from 'src/app/Components/Modals/modal-mission-new/modal-mission-new.component';
import { MissionInterface } from 'src/app/Interfaces/mission.interface';
import { UserInterface } from 'src/app/Interfaces/userI.interface';
import { MissionService } from 'src/app/Services/mission.service';
import { UserService } from 'src/app/Services/user.service';


@Component({
	selector: 'app-mission',
	templateUrl: './mission.component.html',
	styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit, OnDestroy {

	// TS variables
	private _subUser!: Subscription;
	private _subLstMissions !: Subscription;

	// HTML variables
	userCur!: UserInterface;
	showTab: boolean = false;
	lstMissions: MissionInterface[] = [];
	showModalAdd: boolean = false;
	titleBtnModal: string = "Demander une mission";
	selectorModalContent: any = ModalMissionNewComponent;
	constructor(private _UserService: UserService, private _MissionService: MissionService, private _router: Router) {
	}

	// Actions details
	onClickAdd(idMission: number) {
		this._router.navigateByUrl("/missions/" + idMission);
	}

	onClickDelete(idMission: number) {
		console.log(`exportToPdf`, idMission);
	}


	// Hooks
	async ngOnInit(): Promise<void> {

		console.log(`ONINIT MISSIONS ===========`)
		this._subUser = this._UserService.userCur$.subscribe(user => {
			this.userCur = user;
		});

		if (this.lstMissions.length === 0) {
			const responseLstMissions = await this._MissionService.getlstMissionByOneUser();
			if (responseLstMissions.status === 200) {
				this._MissionService.lstMissions$.subscribe(lstMissions => this.lstMissions = lstMissions);
			}

		}

		this.showTab = this.lstMissions.length > 0;
	}

	ngOnDestroy(): void {
		console.log(`ONDestroy MISSIONS xxxxxxxxxxxxxxxxxxxxxx`)
		this._subUser.unsubscribe();
		this._subLstMissions.unsubscribe();
	}


}