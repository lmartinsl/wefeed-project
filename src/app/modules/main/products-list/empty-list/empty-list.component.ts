import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss']
})
export class EmptyListComponent implements OnInit {
  @Input() isPerson: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
