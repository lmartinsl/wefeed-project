import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  public formReset: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
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

  public reset(): void {
    console.log(this.formReset)
  }
}
