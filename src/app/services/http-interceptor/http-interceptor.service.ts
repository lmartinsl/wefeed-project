import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthApi } from "../auth.constants";
import { LocalStorageService } from "../local-storage/local-storage.service";

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {

  constructor( 
    private storage: LocalStorageService,
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.isTokenNecessary(req.url)) {
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

  public isTokenNecessary(url: string){
    switch (url){
      case AuthApi.LOGIN:
      case AuthApi.REGISTER:
        return false
      default:
        return true
    }
  }
}