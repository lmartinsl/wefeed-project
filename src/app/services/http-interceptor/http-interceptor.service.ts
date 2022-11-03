import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { LocalStorageService } from "../local-storage/local-storage.service";

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {

  constructor( 
    private storage: LocalStorageService,
    private auth: AuthService
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.auth.isTokenNecessary(req.url)) {
        const token = this.storage.get('token');
        req = req.clone({
          url:  req.url,
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
    }

    return next.handle(req);
  }
}