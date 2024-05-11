import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MissionInterface } from 'src/app/Interfaces/mission.interface';
import { MissionComponent } from 'src/app/Pages/mission/mission.component';
import { MissionService } from 'src/app/Services/mission.service';


@Component({
  selector: 'app-modal-mission-delete',
  templateUrl: './modal-mission-delete.component.html',
  styleUrls: ['./modal-mission-delete.component.css']
})
export class ModalMissionDeleteComponent  {

  // TS variables
  @Input() aMission !: MissionInterface;
  parentComponent !: MissionComponent;

  constructor(private modalService: NgbModal, private _MissionService: MissionService) {
  }


  // Events Modal
  onOpenModal() {
    this.modalService.open(ModalMissionDeleteComponent);
  }

  onCloseModal() {
    this.modalService.dismissAll();
  }

  async onSubmitDeleteMission() {

    if (this.aMission != undefined) {

      const responseMission = await this._MissionService.dltDeleteMission( this.aMission);

      if (responseMission.status === 200) {

        this.parentComponent.reloadLstMissions();
        this.modalService.dismissAll();

      } else {
        console.log(`erreor responMission`, responseMission)
      }

    } else {
      console.log(`mission non trouve`, this.aMission);
    }

  }

}
