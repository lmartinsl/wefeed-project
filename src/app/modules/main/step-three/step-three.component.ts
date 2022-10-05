import { AuthService } from './../../../services/auth.service';
import { AuthComponent } from './../../auth/auth.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) {

  }

  ngOnInit(): void {

  }

}
