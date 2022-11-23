import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGetCategoriesResponse } from 'src/app/interfaces/get-categories-response.interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { IMG_SRC } from './category-item-card.constants';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesItems: IGetCategoriesResponse;
  isLoaded: boolean;
  isPerson: boolean;
  showChoiceModal: boolean;
  titleNav: string = 'Categorias'
  choiceModalData = {
    question:'Deseja realmente sair do aplicativo?',
    firstButton:'Sim',
    secondButton: "Não"
  }


  constructor(
    private router: Router,
    private categoryService: CategoriesService,
    private user: UserService,
    private storage: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.isPerson = this.user.verifyClientProfileIsPerson();
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

  public logOut(): void {
    this.router.navigateByUrl('auth/login')
  }

  getImgUrl(itemName: string){
    return IMG_SRC[itemName]
  }

  redirectToProductsListView(chosenCategory: any){
    this.storage.set('chosenCategory', JSON.stringify({id: chosenCategory.target.id, name: chosenCategory.target.alt || chosenCategory.target.innerText}))
    this.router.navigate(['pro'], { queryParams: { id: chosenCategory.target.id, name: chosenCategory.target.alt || chosenCategory.target.innerText  }, skipLocationChange: true })
    // this.router.navigate(['main/products'], { skipLocationChange: true })
  }

  openChoiceModal(){
    this.showChoiceModal = true;
  }

  closeChoiceModal(){
    this.showChoiceModal = false;
  }

  onChoiceModalResponse(userChoice: any){
    this.closeChoiceModal();
    if(userChoice.target.innerText === "Sim"){
      this.logOut()
    }
  }

  redirectToProfile(){
    console.log('foi para o perfil')
  }


}
