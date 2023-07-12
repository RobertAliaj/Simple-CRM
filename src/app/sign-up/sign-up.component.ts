import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { LoginForm } from 'src/models/login-form.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {


  userSignUp: LoginForm = new LoginForm();
  signUpFormValid!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }


  ngOnInit() {
    this.signUpFormValid = this.fb.group({
      email: [this.userSignUp.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [this.userSignUp.password, Validators.required],
    });
  }


  signUp() {
    if (this.signUpFormValid.valid) {
      this.getValuesFromInput();
      this.register();
    }
  }


  getValuesFromInput() {
    this.userSignUp.email = this.signUpFormValid.get('email')?.value;
    this.userSignUp.password = this.signUpFormValid.get('password')?.value;
  }


  register() {
    this.authService.signUp(this.userSignUp.email, this.userSignUp.password)
      .then(response => {
        this.authService.signOut();
        this.router.navigate(['login']);  // Weiterleiten zur Hauptseite
      })
      .catch(error => {
        // Behandeln Sie hier Fehler, z.B. indem Sie eine Fehlermeldung anzeigen
      });
  }
}