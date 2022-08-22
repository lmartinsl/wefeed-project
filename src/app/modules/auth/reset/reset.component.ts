import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { statusSnackbar } from 'src/app/enums/status-snackbar';
import { User } from './../../../interfaces/user';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  public userVerified: boolean = false;
  public formReset: FormGroup;

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

    this.formReset = this.fb.group({
      email: ['', [required, email]],
      pwd1: ['', [required, minLength(6), maxLength(8)]],
      pwd2: ['', [required, minLength(6), maxLength(8)]],
    }, { validator: this.matchingPwds })
  }

  private matchingPwds(group: FormGroup): any {
    if (group) {
      const { ...control } = group.controls
      if (control.pwd1.value === control.pwd2.value) {
        return null // OK
      }
    }
    return { hasMatchingError: true } // NOT OK
  }

  public checkUserRegistration(email: string): void {
    this.authService.getUsers()
      .subscribe((users: User[]) => {
        const i = users.findIndex((u: User) => u.email === email)
        if (i >= 0) {
          this.userVerified = true;
          this.authService.showSnackbar('Usuário encontrado.', statusSnackbar.SUCCESS)
        } else {
          this.authService.showSnackbar('E-mail não cadastrado.', statusSnackbar.ERROR)
        }
      })
  }

  public reset(): void {
    if (!this.userVerified) return
    this.authService
      .resetPwd(this.emailForm, this.newPwd)
      .subscribe((res: boolean) => {
        if (res) {
          this.authService.showSnackbar('Senha alterada com sucesso.', statusSnackbar.SUCCESS)
          setTimeout(() => this.router.navigateByUrl('/auth/login'), 2000)
        }
      })
  }

  public get emailForm(): string {
    return this.formReset.get('email').value
  }

  public get newPwd(): string {
    return this.formReset.get('pwd2').value
  }
}
