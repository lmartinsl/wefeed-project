import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, scheduled, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { AuthApi } from './auth.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private mockLoginPwd: Array<User> = [];
  public hasAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public hasAuth$: Observable<boolean> = this.hasAuthenticated$.asObservable();

  constructor(
    private readonly snackbar: MatSnackBar,
    private http: HttpClient
      ) { }

  public getUsers(): Observable<User[]> {
    return of(this.mockLoginPwd)
  }

  public login(user: User): Observable<{ login: boolean, status: string }> {
      const headers = AuthApi.ACCEPTED
      const body = {
        login: user.email,
        pass: user.pwd
      }


      return (this.http.post(AuthApi.LOGIN, body)
      .pipe(
        map(
        response => {
          this.hasAuthenticated$.next(true)
          const successResponse = { status: `Olá ${response.name} !`, login: true }
          return successResponse
        })
      ));
    
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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  // public resetPwd(): boolean {}
}
