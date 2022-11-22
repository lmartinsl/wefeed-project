import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products/products.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  isLoaded: boolean = false;
  isPerson: boolean;
  productListParams: { id: string; name: string };
  productsList = []
  isproductListEmpty: boolean;

  constructor(
    private readonly router: Router,
    private storage: SessionStorageService,
    private service: ProductsService,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.isPerson = this.user.verifyClientProfileIsPerson();

    this.productListParams = JSON.parse(this.storage.get('chosenCategory'))

    if(this.isPerson) {
      this.getProductsByCategory()
    } else {
      this.getProductsByOwner()
    }

  }

  getProductsByCategory(){
    this.productsList = [];

    this.service.getProductsByCategories(Number(this.productListParams.id))
    .pipe(
      take(1)
    )
    .subscribe(
      (response) => {
        this.productsList = response;
        this.checkListLength();
        this.isLoaded = true;
      },
      () => {},
    )
  }

  getProductsByOwner(){
    this.productsList = [];

    this.service.getProductsByOwner(Number(this.user.getOwnerId()))
    .pipe(
      take(1)
    )
    .subscribe(
      (response) => {
        response.forEach(element => {
          if(element.category.id.toString() !== this.productListParams.id){
            return
          }
          this.productsList.push(element);
        });
        this.checkListLength();
        this.isLoaded = true;
      },
      () => {},
    )
  }

  checkListLength(){
    this.isproductListEmpty = (this.productsList.length === 0)
  }

  backNavigation() {
    this.router.navigateByUrl('main/categories');

    // this.router.navigateByUrl('cat')
  }

  registerNewProduct() {
    this.router.navigate(['main/product-register'] , { skipLocationChange: true });
    // this.router.navigate(['reg'], {
    //   skipLocationChange: true
    // });
  }

  onHeaderButtonClick(_clickedButton: string) {
    switch (_clickedButton) {
      case 'backButton':
        this.backNavigation()
        break
      case 'addButton':
        this.registerNewProduct()
        break
      default:
        console.error('Ops, algo deu errado');
    }
  }

}
