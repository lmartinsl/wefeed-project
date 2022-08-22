import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public titleNav: string = 'Quem somos'

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  public updateTitleNav(currentTitle): void {
    this.titleNav = currentTitle
  }

  public logOut(): void {
    this.router.navigateByUrl('auth/login')
  }

  ngOnDestroy(): void {
    this.authService.hasAuthenticated$.next(false);
  }

}
