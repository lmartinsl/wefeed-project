import { AuthService } from './../../../services/auth.service';
import { AuthComponent } from './../../auth/auth.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) {

  }

  ngOnInit(): void {

  }

}
