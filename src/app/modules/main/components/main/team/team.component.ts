import { Person } from '../../../../../interfaces/person';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public people: Array<Person> = [
    { name: 'Lucas Martins', ra: '123456789', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Lucas Martins', ra: '123456789', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Lucas Martins', ra: '123456789', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Lucas Martins', ra: '123456789', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Lucas Martins', ra: '123456789', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Lucas Martins', ra: '123456789', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Lucas Martins', ra: '123456789', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Lucas Martins', ra: '123456789', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Lucas Martins', ra: '123456789', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Lucas Martins', ra: '123456789', imgPath: '../../../../../assets/images/others/profile.png' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  public isPositionImpar(position: number): boolean {
    return (position % 2 === 1)
  }

}
