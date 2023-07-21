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
  emailDoesntExist: boolean = false;
  isPasswordSent: boolean = false;

  emailFormType: any = {
    email: ''
  }

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


  /**
  * Sends a reset password link if email is correct, otherwise notifies the user that the email is invalid.
  */
  async resetPasswordOrHandleWrongEmail() {
    if (this.emailForm.valid)
      this.getValuesFromInput();
    await this.checkIfEmailIsRegistered();
    this.emailDoesntExist ? this.handleWrongEmail() : this.sendEmail();
  }


  /**
   * Checks if the input email is registered
   */
  async checkIfEmailIsRegistered() {
    const isEmailRegistered = await this.authService.afAuth.fetchSignInMethodsForEmail(this.emailFormType.email);
    this.emailDoesntExist = isEmailRegistered.length === 0;
  }


  handleWrongEmail() {
    this.emailForm.enable();
    this.emailForm.patchValue({ email: '' });
    setTimeout(() => this.emailDoesntExist = false, 3000);
  }


  /**
   * Call the Function to send the reset Password Email from the AuthService
   */
  sendEmail() {
    this.authService.resetPassword(this.emailFormType.email);
    this.isPasswordSent = true;
    setTimeout(() => {
      this.dialogRef.close();
      this.isPasswordSent = false;
    }, 2500);
  }


  getValuesFromInput() {
    this.emailFormType.email = this.emailForm.get('email')?.value;
  }

}
