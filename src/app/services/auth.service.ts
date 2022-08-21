import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private mockLoginPwd: Array<User> = [];
  private hasAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public hasAuth$: Observable<boolean> = this.hasAuthenticated$.asObservable();

  constructor(
    private readonly snackbar: MatSnackBar
  ) { }

  public getUsers(): Observable<User[]> {
    return of(this.mockLoginPwd)
  }

  public login(user: User): Observable<{ login: boolean, status: string }> {
    if (this.checkListUser(user)) {
      const { index: i } = this.checkListUser(user)

      if (
        this.mockLoginPwd[i].email === user.email &&
        this.mockLoginPwd[i].pwd === user.pwd
      ) {
        const firstName = this.mockLoginPwd[i].fullName.split(' ')[0]
        this.hasAuthenticated$.next(true)
        return of({ status: `Olá, ${firstName}!`, login: true })
      } else {
        return of({ status: 'Senha incorreta.', login: false })
      }
    } else {
      return of({ status: 'Usuário não cadastrado.', login: false })
    }
  }

  private checkListUser(user: User): { hasRegistered: boolean, index: number } {
    const i = this.mockLoginPwd.findIndex((u: User) => u.email === user.email)
    return i >= 0 ? { hasRegistered: true, index: i } : null
  }

  public register(user: User): Observable<{ msg: string, status: boolean }> {
    const i = this.mockLoginPwd.findIndex((u: User) => u.email === user.email)
    if (i >= 0) {
      return of({ msg: 'Usuário já existe.', status: false })
    } else {
      this.mockLoginPwd.push(user)
      return of({ msg: 'Usuário cadastrado.', status: true })
    }

  }

  public showSnackbar(msg: string, status: string): void {
    this.snackbar.open(
      msg, null,
      {
        duration: 2000,
        panelClass: `snack${status}`
      } as MatSnackBarConfig)
  }

  // public resetPwd(): boolean {}
}
