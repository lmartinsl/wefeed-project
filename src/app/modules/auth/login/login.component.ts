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
      }, () => this.authService.showSnackbar(`Ops, algo deu errado.`, 'Error') )
  }
}
