import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGetCategoriesResponse } from 'src/app/interfaces/get-categories-response.interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { API_ERRORS } from 'src/app/shared/constants/api-errors.constants';
import { IMG_SRC } from './category-item-card.constants';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesItems: IGetCategoriesResponse;
  isLoaded: boolean;
  titleNav: string = 'Categorias'


  constructor(
    private router: Router,
    private categoryService: CategoriesService,
    private elementRef: ElementRef

    ) { }

  ngOnInit(): void {
    this.getCategoriesItems()
  }

  private getCategoriesItems(){
    this.categoryService.getCategories().subscribe(
      (response) => {
      this.categoriesItems = response;
      this.isLoaded = true  
    },
      error => { 
        console.log(error)
      }
    )
  }

  public updateTitleNav(currentTitle): void {
    this.titleNav = currentTitle
  }

  public logOut(): void {
    this.router.navigateByUrl('auth/login')
  }

  getImgUrl(itemName: string){
    return IMG_SRC[itemName]
  }

  redirectToProductsListView(chosenCategory: any){
    this.router.navigate(['pro'], { queryParams: { id: chosenCategory.target.id, name: chosenCategory.target.alt || chosenCategory.target.innerText  }, skipLocationChange: true })
    // this.router.navigate(['main/products'], { queryParams: { id: chosenCategory.target.id, name: chosenCategory.target.alt || chosenCategory.target.innerText  }, skipLocationChange: true })

  }

}
