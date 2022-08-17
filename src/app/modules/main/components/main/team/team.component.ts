import { Person } from '../../../../../interfaces/person';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public people: Array<Person> = [
    { name: 'Daniel Valle', ra: '1600204', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Clarindo Sal', ra: '2200105', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Eduardo Luiz', ra: '2200568', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Flávia Vastres', ra: '2200463', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Jackson Santos', ra: '2200577', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Lucas Martins', ra: '2201526', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Priscilla Souza', ra: '2200555', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Willian Nunesa', ra: '2200274', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'André Yamach', ra: '2201870', imgPath: '../../../../../assets/images/others/profile.png' },
    { name: 'Jonatas Andrade', ra: '2201911', imgPath: '../../../../../assets/images/others/profile.png' },
  ]

  constructor() { }

  ngOnInit(): void {
    this.people.sort((a, b) => {
      if (a.name > b.name) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      }
      return 0;
    })
  }

  public isPositionImpar(position: number): boolean {
    return (position % 2 === 1)
  }

}
