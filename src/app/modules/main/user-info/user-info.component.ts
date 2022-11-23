import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { UserProfileEnum } from './user-info.enum';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})

export class UserInfoComponent implements OnInit {
 user: any;

  constructor(
    private storage: SessionStorageService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.storage.get('user'))
  }

  onHeaderButtonClick() {
    this.router.navigateByUrl('main/categories');
  }

  putPhoneMask(value: any) {
    let phoneValue = value.toString();
    phoneValue = phoneValue.replace(/\D/g, '');
    phoneValue = phoneValue.replace(/^(\d{2})(\d)/g, '($1) $2');
    phoneValue = phoneValue.replace(/(\d)(\d{4})$/, '$1-$2');
    return phoneValue;
  }

  getUserProfile(){
    return UserProfileEnum[this.user.profile];
  }

}
