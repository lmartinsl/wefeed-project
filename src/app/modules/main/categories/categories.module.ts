import { AuthService } from './../../../services/auth.service';
import { AuthComponent } from './../../auth/auth.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private router: Router) { }

  public titleNav: string = 'Categorias'


  ngOnInit(): void {

  }

  public updateTitleNav(currentTitle): void {
    this.titleNav = currentTitle
  }

  public logOut(): void {
    this.router.navigateByUrl('auth/login')
  }

}
