
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-mission-new',
  templateUrl: './modal-mission-new.component.html',
  styleUrls: ['./modal-mission-new.component.css'],
  // standalone: true,
})
export class ModalMissionNewComponent {
  // activeModal = inject(NgbActiveModal);

  @Input() name: string = "test";
}
