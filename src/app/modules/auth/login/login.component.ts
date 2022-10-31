import { User } from 'src/app/interfaces/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public hasMsgErrorLoginAndPwd: boolean = false;
  private mockLoginPwd = { login: 'lucas@hotmail.com', pwd: 'lucas123' };

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    const { email, minLength, maxLength, required } = Validators
    this.formLogin = this.fb.group({
      email: ['', [email, required]],
      pwd: ['', [required, minLength(6), maxLength(12)]]
    })
  }

  public login(): void {
    const { email, pwd } = this.formLogin.controls
    const user: User = { email: email.value, pwd: pwd.value }

    this.authService.login(user)
      .subscribe((status) => {
        if (status.login) {
          this.authService.showSnackbar(status.status, 'Success')
          setTimeout(() => {
            this.router.navigateByUrl('main/categories')
          }, 2000)
        } else {
          this.authService.showSnackbar(status.status, 'Error')
        }
      })
  }
}
