import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGetCategoriesResponse } from 'src/app/interfaces/get-categories-response.interface';
// import { JWTTokenService } from '../jwt/jwt-token.service';
// import { LocalStorageService } from '../local-storage/local-storage.service';
import { CategoriesApi } from './categories.constants';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

    constructor(
        private http: HttpClient,
    ) {}

    
    public getCategories(): Observable<IGetCategoriesResponse> {    
        return (this.http.get(CategoriesApi.GET_CATEGORIES)
        .pipe(
          map(
          (response: any) => {
            return response
          })
        ));
      }

}
