import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { API_ERRORS } from 'src/app/shared/constants/api-errors.constants';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  private _newPassword: string;
  showResetSection: boolean = false;
  isPasswordSimilar: boolean;
  userEmail: string;
  
  private get newPassword(){
    return this._newPassword
  }

  private set newPassword(value: string){
     this._newPassword = value
  }

  public formEmail: FormGroup
  public formPassword: FormGroup


  constructor(
    private auth: AuthService,
    private router: Router,
    private readonly fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.createEmailInputForm()
  }

  createEmailInputForm() {
    const { email, minLength, maxLength, required } = Validators
    this.formEmail = this.fb.group({
      email: ['', [email, required]]
    })
  }

  createPasswordInputForm() {
    const {minLength, maxLength, required } = Validators
    this.formPassword = this.fb.group({
      password: ['', [required, minLength(6), maxLength(12)]],
      passwordRepeated: ['', [required, minLength(6), maxLength(12)]]
    })
  }

  setNewPassword(){
    const { password } = this.formPassword.controls
    this.newPassword = password.value
  }

  checkPasswordSimilarity(){
    const { passwordRepeated } = this.formPassword.controls
    this.isPasswordSimilar = (this.newPassword === passwordRepeated.value)

    if(!this.isPasswordSimilar) {
      this.formPassword.controls.passwordRepeated.setErrors({
        isNotPasswordSimilar: false
      })
    }
  
  }

  validateUserEmail(){
    const { email } = this.formEmail.controls
    this.userEmail = email.value;


 
    this.auth.validate(email.value).subscribe(
      () => {
      this.showResetSection = true
      this.createPasswordInputForm()
    },
      error => { 
        switch (error.status){
          case API_ERRORS.NOT_FOUND:
          this.auth.showSnackbar(`Email incorreto. Verifique novamente`, 'Error')
          break
          default:
          this.auth.showSnackbar(`Algo deu errado, tente mais tarde`, 'Error')
        }
      }
    )
  }

  resetUserPassword(){
    const resetInfo = {
      email: this.userEmail,
      pass: this.newPassword
    }

    this.auth.reset(resetInfo).subscribe(
      () => {
        this.auth.showSnackbar(`Senha resetada com sucesso!`, 'Success');
        this.router.navigateByUrl('auth/login')
      },
      error => {
        this.auth.showSnackbar(`Algo deu errado, tente novamente`, 'Error')
      }
    )
  }
}
