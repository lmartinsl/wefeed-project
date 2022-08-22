import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:3000';

  public users: User[] = [];

  public hasAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public hasAuth$: Observable<boolean> = this.hasAuthenticated$.asObservable();

  constructor(
    private readonly snackbar: MatSnackBar,
    private readonly http: HttpClient
  ) {
    this.populateUsers();
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`)
  }

  public login(user: User): Observable<{ login: boolean, status: string }> {
    if (this.checkListUser(user).hasRegistered) {
      const { index: i } = this.checkListUser(user)

      if (
        this.users[i].email === user.email &&
        this.users[i].pwd === user.pwd
      ) {
        const firstName = this.users[i].fullName.split(' ')[0]
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
    const i = this.users.findIndex((u: User) => u.email === user.email)
    return { hasRegistered: i >= 0 ? true : false, index: i }
  }

  public register(user: User): Observable<{ msg: string, status: boolean }> {
    const hasUser = this.checkListUser(user);
    if (hasUser.hasRegistered) {
      return of({ msg: 'Usuário já existe.', status: false })
    } else {
      this.http.post(`${this.url}/users`, user).subscribe(() => this.populateUsers());
      return of({ msg: 'Usuário cadastrado.', status: true })
    }
  }

  public resetPwd(email: string, newPwd: string): Observable<boolean> {
    const i = this.users.findIndex((u: User) => u.email === email)
    if (i >= 0) {
      const idUser = this.users[i].id
      this.users[i].pwd = newPwd
      this.http.put(`${this.url}/users/${idUser}`, this.users[i]).subscribe(() => this.populateUsers())
      return of(true)
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

  private populateUsers(): void {
    this.getUsers()
      .subscribe((users: User[]) => this.users = users)
  }

}
