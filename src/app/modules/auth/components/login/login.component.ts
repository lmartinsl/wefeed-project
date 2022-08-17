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
    private readonly router: Router
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
    if (this.formLogin.valid) {
      const { email, pwd } = this.formLogin.controls
      if (
        email.value === this.mockLoginPwd.login &&
        pwd.value === this.mockLoginPwd.pwd
      ) {
        this.hasMsgErrorLoginAndPwd = false;
        this.router.navigateByUrl('main')
      } else {
        this.hasMsgErrorLoginAndPwd = true;
        this.formLogin.reset();
        setTimeout(() => this.hasMsgErrorLoginAndPwd = false, 5000)
      }
    }
  }
}
