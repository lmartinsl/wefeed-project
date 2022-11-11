import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productListParams: {id: string, name: string}

  constructor(
    private readonly router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params)=>{
      this.productListParams = {
        id: params.id,
        name: params.name 
      }
      console.log(this.productListParams)
    })
  }

  onHeaderBackButtonClick(_clickedButton: string){
    // this.router.navigateByUrl('main/categories')
    this.router.navigateByUrl('cat')

  }

}
