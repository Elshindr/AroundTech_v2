import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inject, TemplateRef } from '@angular/core';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MissionInterface } from 'src/app/Interfaces/mission.interface';


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css'],
})
export class ModalWindowComponent  {
/* 
 // private modalService = inject(NgbModal);
  @Input() titleBtnModal: string = "-1";
  @Input() selectorModalContent : any = ModalWindowComponent;
  @Input() lstMissions: MissionInterface[] = [];
  @Input() aMission!: MissionInterface | undefined;

  @Output() outOpenModal : EventEmitter<void> = new EventEmitter<void>();

  title:string= "";
  nameModal: string = "";

  constructor(private modalService: NgbModal){}

  onOpenModal() {

    const modalRef = this.modalService.open('modalWindow');
    console.log(`open in window`, this.selectorModalContent)
    if (this.selectorModalContent != null){
      this.nameModal =  this.selectorModalContent.name;
      this.modalService.open(this.selectorModalContent);
    }
    //this.modalService.open('modalWindow');
  }


/*   ngOnInit(): void {
   // this.open(modalWindow)

   // const modalRef = this.modalService.open(NgbdModalContent);
    //modalRef.componentInstance.name = 'World';


  } 
  outCloseModal(event: any){
    console.log(`dans le PARENT`)
    this.modalService.dismissAll();
  } */

}