import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalMissionDeleteComponent } from 'src/app/Components/Modals/modal-mission-delete/modal-mission-delete.component';
import { ModalMissionNewComponent } from 'src/app/Components/Modals/modal-mission-new/modal-mission-new.component';
import { ModalWindowComponent } from 'src/app/Components/Modals/modal-window/modal-window.component';
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
	aMission!: MissionInterface| undefined;
	
	
	// Modal variables
	//@ViewChild('modalAddMission') modalEditMissionComponent!: ModalMissionNewComponent;
	showModalAdd: boolean = false;
	titleBtnModal: string = "";
	//selectorModalContent: any= null;
	
	constructor(private modalService: NgbModal, private _UserService: UserService, private _MissionService: MissionService, private _router: Router, private crf: ChangeDetectorRef) {
	}

	// Actions details
	onClickAdd() {
		//this.selectorModalContent = ModalMissionNewComponent;
		this.titleBtnModal = "Demander une mission";
		//this.crf.detectChanges(); // Nécessaire pour mettre à jour le contenu de la modal mére
		//this.modalEditMissionComponent.onOpenModal();
		//this.modalService.open(ModalMissionNewComponent);

		const modalRef = this.modalService.open(ModalMissionNewComponent);
		modalRef.componentInstance.titleBtnModal = this.titleBtnModal ;
	}

	onClickDelete(idMission: number) {
		console.log(`onClickDelete`, idMission);

		this.aMission = this.lstMissions.find(mis => mis.id == idMission);

		if (this.aMission == undefined) {
			// TODO: si non trouve : Erreur
			return;
		}

		this.titleBtnModal = "Supprimer une mission";
		//this.selectorModalContent = ModalMissionDeleteComponent;
	}

	onClickEdit(idMission: number) {
		console.log(`onClickEdit`, idMission);

		this.titleBtnModal = "Editer une mission";
		
		this.aMission = this.lstMissions.find(mis => mis.id == idMission);
		if (this.aMission == undefined) {
			// TODO: si non trouve : Erreur
			return;
		}

		//this.selectorModalContent = ModalMissionDeleteComponent;
	}


	// Hooks
	async ngOnInit(): Promise<void> {

		console.log(`ONINIT MISSIONS ===========`)

		//this._subModalWindow = this.modalWindow$.subscribe(obs => this.selectorModalContent = obs)

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