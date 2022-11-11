import { User } from 'src/app/interfaces/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_ERRORS } from 'src/app/shared/constants/api-errors.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public hasMsgErrorLoginAndPwd: boolean = false;

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
      .subscribe((response) => {
          this.authService.showSnackbar(`Olá ${response.name}`, 'Success')
          setTimeout(() => {
            this.router.navigateByUrl('main/categories')
          }, 200)
      },       error => { 
        switch (error.status){
          case API_ERRORS.UNAUTHORIZED:
          this.authService.showSnackbar(`Email e/ou senha incorretos. Verifique novamente`, 'Error')
          break
          default:
          this.authService.showSnackbar(`Algo deu errado, tente mais tarde`, 'Error')
        }
      }
      )
  }
}
