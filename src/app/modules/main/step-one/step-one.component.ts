import { AuthService } from './../../../services/auth.service';
import { AuthComponent } from './../../auth/auth.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) {

  }

  ngOnInit(): void {

  }

}
