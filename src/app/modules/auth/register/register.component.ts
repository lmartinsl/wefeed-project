import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  private createForm(): void {

    const { required, email, minLength, maxLength } = Validators

    this.formRegister = this.fb.group({
      email: ['', [required, email]],
      pwd: ['', [required, minLength(6), maxLength(12)]],
      fullName: ['', [required, minLength(8)]],
    })
  }

  public register(): void {

    const { email, pwd, fullName } = this.formRegister.controls
    const user: User = {
      email: email.value,
      pwd: pwd.value,
      fullName: fullName.value,
    }

    this.authService.register(user)
      .subscribe((res) => {
        if (res.status) {
          this.authService.showSnackbar(res.msg, 'Success')
          setTimeout(() => this.router.navigateByUrl('auth/login'), 2000)
        } else {
          this.authService.showSnackbar(res.msg, 'Error')
        }
      })
  }
}
