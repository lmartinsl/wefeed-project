import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'products-list-item',
  templateUrl: './products-list-item.component.html',
  styleUrls: ['./products-list-item.component.scss']
})
export class ProductsListItemComponent implements OnInit {
  @Input() productData: any;
  @ViewChild('modal') modal!: ElementRef;
  isProductDetailsModalEnabled: boolean = false;

  constructor(
    private elementRef:ElementRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('#list-item')
      .addEventListener('click', this.showProductDetailsModal.bind(this));
  }
  
  showProductDetailsModal(event) {
    this.isProductDetailsModalEnabled = true;
  }

  closeProductDetailsModal() {
    this.isProductDetailsModalEnabled = false; 
  }

}
