import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'products-list-item',
  templateUrl: './products-list-item.component.html',
  styleUrls: ['./products-list-item.component.scss']
})
export class ProductsListItemComponent implements OnInit {
  @Input() productData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
