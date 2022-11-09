import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGetCategoriesResponse } from 'src/app/interfaces/get-categories-response.interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { API_ERRORS } from 'src/app/shared/api-errors.constants';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesItems: IGetCategoriesResponse;

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
      this.categoriesItems = response;    },
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

}
