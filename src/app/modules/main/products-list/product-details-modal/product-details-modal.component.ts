import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { WHATSAPP } from './product-details-modal.constants';

@Component({
  selector: 'product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.scss'],
})
export class ProductDetailsModalComponent implements OnInit {
  @Input() productData: any;
  @Output() closeButtonClicked = new EventEmitter<string>();

  modal: HTMLElement;
  closeModalButton: Element;
  footerModalButton: Element;
  footerButtonLabel: string = 'excluir produto'
  isPerson: boolean;

  constructor(
    private elementRef: ElementRef,
    private user: UserService
    ) {}

  public openModal() {
    this.modal.style.display = 'block';
  }

  ngOnInit(): void {
    this.modal = document.getElementById('myModal');
    this.closeModalButton = document.getElementsByClassName('close')[0];
    this.footerModalButton = document.getElementsByClassName('modal-footer')[0];

    this.isPerson = this.user.verifyClientProfileIsPerson();
    this.footerButtonLabel = this.isPerson ? 'contatar doador' : 'excluir produto';

    this.showModal();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement
      .querySelector('span')
      .addEventListener('click', this.closeProductDetailsModal.bind(this));
      
    this.footerModalButton
    .addEventListener('click', this.handleFooterButtonClick.bind(this));
  }

  showModal(){
    this.modal.style.display = 'block';

  }

  closeProductDetailsModal() {
    // this.modal.style.display = 'none';
    this.closeButtonClicked.emit()
  }

  handleFooterButtonClick(event: any) {
    switch(event.target.innerText){
      case 'contatar doador':
        this.sendToWhatsApp()
        break;
      case 'excluir produto':
        this.deleteProduct()
        break
    }
  }

  sendToWhatsApp(){
    window.open(WHATSAPP.URL + this.productData.owner.telephone + WHATSAPP.PRE_TEXT + this.productData.name + WHATSAPP.POS_TEXT);
    console.log('sendToWhatsApp')
  }

  deleteProduct(){
    console.log('deleteProduct')
  }

  putPhoneMask(value: any) {
    let phoneValue = value.toString()
    phoneValue = phoneValue.replace(/\D/g, "")
    phoneValue = phoneValue.replace(/^(\d{2})(\d)/g, "($1) $2")
    phoneValue = phoneValue.replace(/(\d)(\d{4})$/, "$1-$2")
    return phoneValue
}

}
