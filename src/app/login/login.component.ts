import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { LoginForm } from 'src/models/login-form.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { shakeAnimation } from "src/animation";
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [shakeAnimation],

})
export class LoginComponent {

  userLogin: LoginForm = new LoginForm();
  userLoginValid!: FormGroup;
  shakeState: boolean = false;
  loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) { }



  guestLogIn() {
    this.userLogin.email = 'guest@mail.com';
    this.userLogin.password = '123456';
    this.login();
  }


  ngOnInit() {
    this.userLoginValid = this.fb.group({
      email: [this.userLogin.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [this.userLogin.password, Validators.required],
    });
  }


  proceed() {
    if (this.userLoginValid.valid) {
      this.loading = true;
      this.userLoginValid.disable();
      this.getValuesFromInput();
      this.login();
    }
  }

  getValuesFromInput() {
    this.userLogin.email = this.userLoginValid.get('email')?.value;
    this.userLogin.password = this.userLoginValid.get('password')?.value;
  }


  async login() {
    const methods = await this.authService.afAuth.fetchSignInMethodsForEmail(this.userLogin.email);
    let wrongEmail = methods.length === 0;
    if (wrongEmail) this.handleWrongEmail(); else this.tryToLogin();
  }


  async tryToLogin() {
    const result = await this.authService.signIn(this.userLogin.email, this.userLogin.password);
    let canLoginIn = result.user;
    let derFehlerderNichtGezeigtWerdenSoll = result.error
    if (canLoginIn) this.handleSuccsessfulLogin(); else console.log(derFehlerderNichtGezeigtWerdenSoll);
  }


  handleSuccsessfulLogin() {
    this.router.navigate(['/dashboard']);
    this.loading = false;
    this.userLoginValid.enable();
  }

  handleWrongEmail() {
    this.userLoginValid.enable();
    this.loading = false;
    console.log('Kein Benutzer mit dieser E-Mail gefunden');
  }


  navigateToSignUp() {
    this.router.navigate(['/signUp']);
  }


  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }
}