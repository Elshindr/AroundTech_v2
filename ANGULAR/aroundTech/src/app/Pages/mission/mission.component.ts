import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalMissionDeleteComponent } from 'src/app/Components/Modals/modal-mission-delete/modal-mission-delete.component';
import { ModalMissionEditComponent } from 'src/app/Components/Modals/modal-mission-edit/modal-mission-edit.component';
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
	
	
	// Modal variables
	//@ViewChild('modalAddMission') modalEditMissionComponent!: ModalMissionNewComponent;
	//showModalAdd: boolean = false;
	//titleBtnModal: string = "";
	//selectorModalContent: any= null;
	
	constructor(private modalService: NgbModal, private _UserService: UserService, private _MissionService: MissionService, private _router: Router, private crf: ChangeDetectorRef) {
	}

	// Actions details
	onClickAdd() {
		const modalRef = this.modalService.open(ModalMissionEditComponent);
		modalRef.componentInstance.titleBtnModal = "Demander une mission" ;
		modalRef.componentInstance.lstMissions = this.lstMissions;
		modalRef.componentInstance.parentComponent = this;
	}

	onClickDelete(aMission: MissionInterface) {

		if (aMission == undefined) {
			// TODO: si non trouve : Erreur
			return;
		}
		const modalRef = this.modalService.open(ModalMissionDeleteComponent);
		modalRef.componentInstance.titleBtnModal = "Supprimer une mission";
		modalRef.componentInstance.aMission = aMission;
		modalRef.componentInstance.parentComponent = this;
	
	}

	onClickEdit(aMission: MissionInterface) {
		console.log(`onClickEdit`, aMission);

		if (aMission == undefined) {
			// TODO: si non trouve : Erreur
			return;
		}
		const modalRef = this.modalService.open(ModalMissionEditComponent);
		modalRef.componentInstance.titleBtnModal = "Editer une mission";
		modalRef.componentInstance.aMission = aMission;
		modalRef.componentInstance.parentComponent = this;
	}


	// Hooks

	async reloadLstMissions(){
		const responseLstMissions = await this._MissionService.getlstMissionByOneUser();
		if (responseLstMissions.status === 200) {
			//this._MissionService.lstMissions$.subscribe(lstMissions => this.lstMissions = lstMissions);
		}else{

		}
	}

	async ngOnInit(): Promise<void> {

		this._subUser = this._UserService.userCur$.subscribe(user => this.userCur = user);

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