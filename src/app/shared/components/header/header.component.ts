import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title?: string;
  @Input() backButton?: boolean;
  @Input() menuButton?: boolean;

  @Output() buttonClicked = new EventEmitter<string>();


  constructor(
    private elementRef:ElementRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const buttons = this.elementRef.nativeElement.querySelectorAll('button')
    let buttonIndex = buttons.length
    while (buttonIndex --)
      buttons[buttonIndex].addEventListener('click', this.emitButtonClick.bind(this));
  }

  emitButtonClick(event: any){
    this.buttonClicked.emit(event.target.value)
  }

}
