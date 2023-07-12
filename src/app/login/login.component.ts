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
    if (methods.length === 0) {
      this.authService.signIn(this.userLogin.email, this.userLogin.password)
        .then(response => {
          this.router.navigate(['/dashboard']);
          this.loading = false;
          this.userLoginValid.enable();
        })
        .catch(error => {
          // Behandeln Sie hier Fehler, z.B. indem Sie eine Fehlermeldung anzeigen
        });
    }
  }

  navigateToSignUp() {
    this.router.navigate(['/signUp']);
  }


  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }
}




  // async addUser() {
  //   const usersCollection = collection(this.firestore, 'users');
  //   addDoc(usersCollection, this.userLogin.toJson()).then(async (result) => {
  //     const docSnap = await getDoc(result);
  //   });
  // }