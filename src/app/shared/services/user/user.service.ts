import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  verifyClientProfileIsPerson(): boolean {
    const userInfo = JSON.parse(sessionStorage.getItem('ownerInfo'))
    return (userInfo.profile === 'PERSON')
  }

  getOwnerId(): number {
    const userInfo = JSON.parse(sessionStorage.getItem('ownerInfo'))
    return userInfo.id
  }
}
