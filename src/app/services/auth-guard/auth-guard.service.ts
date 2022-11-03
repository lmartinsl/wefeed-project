import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs'; 
import { JWTTokenService } from '../jwt/jwt-token.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(private router: Router,
              private authStorageService: LocalStorageService,
              private jwtService: JWTTokenService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
      if (this.jwtService.getUser()) {
          if (this.jwtService.isTokenExpired()) {
            this.router.navigateByUrl('auth/login')
          } else {
            return true;
          }
      } else {
            this.router.navigateByUrl('auth/login')
      }
  }
}