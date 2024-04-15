import { Component, Input } from '@angular/core';
import { inject, TemplateRef } from '@angular/core';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMissionNewComponent } from '../modal-mission-new/modal-mission-new.component';


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css'],
})
export class ModalWindowComponent {
  private modalService = inject(NgbModal);
  @Input() titleBtnModal: string = "-1";
  @Input() selectorModalContent : any = ModalWindowComponent;

  title:string= "";

  open(content: TemplateRef<any>) {
    console.log(`open in window`, this.selectorModalContent)
    const modalRef = this.modalService.open(content);
    //modalRef.componentInstance.title = 'Poouet Pouett!';
  }

}