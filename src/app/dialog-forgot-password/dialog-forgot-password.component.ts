import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.scss']
})
export class DialogForgotPasswordComponent {

  emailForm!: FormGroup;
  emailFormType: any = {
    email: ''
  }
  emailDoesntExist: boolean = false;


  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<DialogForgotPasswordComponent>,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.emailForm = this.fb.group({
      email: [this.emailFormType.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }


  async sendPassword() {
    if (this.emailForm.valid) {
      this.getValuesFromInput();
      await this.checkIfEmailExist();
      if (this.emailDoesntExist) this.handleWrongEmail(); else this.sendEmail();
    }
  }

  async checkIfEmailExist() {
    const existingEmail = await this.authService.afAuth.fetchSignInMethodsForEmail(this.emailFormType.email);
    this.emailDoesntExist = existingEmail.length === 0;
  }

  handleWrongEmail() {
    this.emailForm.enable();
    this.emailForm.patchValue({ email: '' });
    setTimeout(() => this.emailDoesntExist = false, 3000);
  }


  sendEmail() {
    this.authService.resetPassword(this.emailFormType.email);
    this.dialogRef.close();
  }

  getValuesFromInput() {
    this.emailFormType.email = this.emailForm.get('email')?.value;
  }

}
