import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'user-choice-modal',
  templateUrl: './user-choice-modal.component.html',
  styleUrls: ['./user-choice-modal.component.scss']
})
export class UserChoiceModalComponent implements OnInit {
  @Input() modalData: any
  @Output() buttonClicked = new EventEmitter<string>();

  modal: HTMLElement;


  constructor() { }

  ngOnInit(): void {
    this.modal = document.getElementById('Modal');
    this.open()
  }

  open(){
    this.modal.style.display = 'block';
  }

  close(event: any){
    this.buttonClicked.emit(event);
  }

}
