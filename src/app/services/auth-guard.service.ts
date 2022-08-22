import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }

  public canActivate(): Observable<boolean> {
    return this.authService.hasAuth$
      .pipe(
        tap((b: boolean) => {
          if (!b) {
            this.router.navigateByUrl('/auth/login')
          }
        })
      )
  }
}
