import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, scheduled, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILoginResponse } from '../interfaces/login-response';
import { IRegisterResponse } from '../interfaces/register-response';
import { User } from '../interfaces/user';
import { AuthApi } from './auth.constants';
import { UserProfile } from './auth.enums';

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

  public login(user: User): Observable<ILoginResponse> {
      const headers = AuthApi.ACCEPTED
      const body = {
        login: user.email,
        pass: user.pwd
      }


      return (this.http.post(AuthApi.LOGIN, body)
      .pipe(
        map(
        (response: ILoginResponse) => {
          this.hasAuthenticated$.next(true)
          return response
        })
      ));
    
  }

  private checkListUser(user: User): { hasRegistered: boolean, index: number } {
    const i = this.mockLoginPwd.findIndex((u: User) => u.email === user.email)
    return i >= 0 ? { hasRegistered: true, index: i } : null
  }

  public register(user: User): Observable<IRegisterResponse> {
    const headers = AuthApi.ACCEPTED
    const body = {
        email: user.email,
        pass: user.pwd,
        telephone: user.telephone,
        cpf: "11111122231",
        profile: UserProfile[user.profile],
        name: user.fullName
    }

    return (this.http.put(AuthApi.REGISTER, body)
    .pipe(
      map(
      (response: IRegisterResponse) => {
        this.hasAuthenticated$.next(true)
        return response
      })
    ));

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
