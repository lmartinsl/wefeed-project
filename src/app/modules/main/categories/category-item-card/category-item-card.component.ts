import { Component, Input, OnInit } from '@angular/core';
import { IMG_SRC } from './category-item-card.constants';

@Component({
  selector: 'category-item-card',
  templateUrl: './category-item-card.component.html',
  styleUrls: ['./category-item-card.component.scss']
})

export class CategoryItemCardComponent implements OnInit {

@Input() itemName: string;

  constructor() { }

  ngOnInit(): void {
  }

  getImgUrl(itemName: string){
    return IMG_SRC[itemName]
  }

}
