import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory } from 'src/app/interfaces/category.interface';
import { IOwner } from 'src/app/interfaces/owner.interface';
import { IPutProductsRequest } from 'src/app/interfaces/put-products-request.interface';
import { IPutProductsResponse } from 'src/app/interfaces/put-products-response.interface';
import { ProductsApi } from './products.constants';
// import { JWTTokenService } from '../jwt/jwt-token.service';
// import { LocalStorageService } from '../local-storage/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    constructor(
        private http: HttpClient,
    ) {}

    public putProducts(category: ICategory, product: any): Observable<IPutProductsResponse> { 
      const owner: IOwner = JSON.parse(sessionStorage.getItem('ownerInfo'))

      const body: IPutProductsRequest = {
        description: product.description,
        dueDate: product.dueDate,
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        status: product.status,
        category: category,
        owner: owner,
      }
      return (this.http.put(ProductsApi.PUT_PRODUCTS, body)
      .pipe(
        map(
        (response: IPutProductsResponse) => {
          return response
        })
      ));
  }

    public getProductsByCategories(category: number): Observable<any> {    
      const params = new HttpParams().set("category", category.toString())

        return (this.http.get(ProductsApi.GET_PRODUCTS_CATEGORIES, {params: params})
        .pipe(
          map(
          (response: any) => {
            return response
          })
        ));
    }

    public getProductsByOwner(owner: number): Observable<any> {   
      const params = new HttpParams().set("owner", owner.toString())

        return (this.http.get(ProductsApi.GET_PRODUCTS_OWNER, {params: params})
        .pipe(
          map(
          (response: any) => {
            return response
          })
        ));
    }

}
