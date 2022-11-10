import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGetCategoriesResponse } from 'src/app/interfaces/get-categories-response.interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { API_ERRORS } from 'src/app/shared/api-errors.constants';
import { IMG_SRC } from './category-item-card.constants';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesItems: IGetCategoriesResponse;
  categoriesItemsMocked = [
    {
      "id": 1,
      "name": "Bebidas",
      "description": "Bebidas",
      "status": "A"
    },
    {
      "id": 2,
      "name": "Frutas",
      "description": "Frutas",
      "status": "A"
    },
    {
      "id": 3,
      "name": "Pães",
      "description": "Pães",
      "status": "A"
    },
    {
      "id": 4,
      "name": "Arroz",
      "description": "Arroz",
      "status": "A"
    },
    {
      "id": 5,
      "name": "Legumes",
      "description": "Legumes",
      "status": "A"
    },
    {
      "id": 6,
      "name": "Feijão",
      "description": "Feijão",
      "status": "A"
    }
  ]
  isLoaded: boolean;

  constructor(
    private router: Router,
    private categoryService: CategoriesService
    ) { }

  public titleNav: string = 'Categorias'


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

}
