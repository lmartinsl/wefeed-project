import { AuthService } from './../../../services/auth.service';
import { AuthComponent } from './../../auth/auth.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) {

  }

  ngOnInit(): void {

  }

}
