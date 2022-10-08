import { AuthService } from './../../services/auth.service';
import { AuthComponent } from './../auth/auth.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) {

  }

  ngOnInit(): void {

  }

}
