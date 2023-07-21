import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { LoginForm } from 'src/models/login-form.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models/user.class';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {


  userSignUp: LoginForm = new LoginForm();
  signUpFormValid!: FormGroup;
  loading: boolean = false;
  user: User = new User();
  color: string = '';
  emailInUse: boolean = false;

  constructor(
    private authService: AuthService,
    public router: Router,
    private fb: FormBuilder,
    private firestore: Firestore
  ) { }


  ngOnInit() {
    this.signUpFormValid = this.fb.group({
      email: [this.userSignUp.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [this.userSignUp.password, [Validators.required, Validators.minLength(4)]],
      firstName: [this.userSignUp.firstName, [Validators.required, Validators.minLength(4)]],
      lastName: [this.userSignUp.lastName, [Validators.required, Validators.minLength(4)]],
      birthDate: [this.userSignUp.birthDate, Validators.required],
      street: [this.userSignUp.street, [Validators.required, Validators.minLength(4)]],
      zipCode: [this.userSignUp.zipCode, [Validators.required, Validators.pattern('^[0-9]*$')]],
      city: [this.userSignUp.city, [Validators.required, Validators.minLength(4)]],
    });
  }


  signUp() {
    if (this.signUpFormValid.valid) {
      this.loading = true;
      this.signUpFormValid.disable();
      this.getValuesFromInput();
      this.copyUserInformation();
      this.checkIfUserCanRegister();
    }
  }


  getValuesFromInput() {
    this.userSignUp.email = this.signUpFormValid.get('email')?.value;
    this.userSignUp.password = this.signUpFormValid.get('password')?.value;
    this.userSignUp.firstName = this.signUpFormValid.get('firstName')?.value;
    this.userSignUp.lastName = this.signUpFormValid.get('lastName')?.value;
    this.userSignUp.birthDate = this.signUpFormValid.get('birthDate')?.value;
    this.userSignUp.street = this.signUpFormValid.get('street')?.value;
    this.userSignUp.zipCode = this.signUpFormValid.get('zipCode')?.value;
    this.userSignUp.city = this.signUpFormValid.get('city')?.value;
  }


  async checkIfUserCanRegister() {
    const isEmailRegistered = await this.authService.afAuth.fetchSignInMethodsForEmail(this.userSignUp.email);
    const canRegister = isEmailRegistered.length === 0
    canRegister ? this.handleSuccessfulRegister() : this.handleEmailAlreadyRegistered();
  }


  /**
   *  Handle if an already registered email is trying to register again
   */
  handleEmailAlreadyRegistered() {
    this.signUpFormValid.enable();
    this.loading = false;
    this.emailInUse = true;
    this.signUpFormValid.patchValue({
      email: ''
    });
    setTimeout(() => this.emailInUse = false, 3000);
  }


  handleSuccessfulRegister() {
    this.authService.signUp(this.userSignUp.email, this.userSignUp.password)
      .then(response => {
        this.addUser();
        this.authService.signOut();
        this.router.navigate(['login']);
        this.signUpFormValid.enable();
        this.loading = false;
      });
  }


  /**
   * Copy the Data from the SignUp Form to the UserObject in order to save it to the firestore
   */
  copyUserInformation() {
    this.user.firstName = this.userSignUp.firstName;
    this.user.lastName = this.userSignUp.lastName;
    this.user.street = this.userSignUp.street;
    this.user.zipCode = this.userSignUp.zipCode;
    this.user.city = this.userSignUp.city;
    this.user.email = this.userSignUp.email;
    this.user.birthDate = this.userSignUp.birthDate;
    this.user.color = this.color = this.getRandomLightColor();
  }


  /**
   * Add the user who got registered to the user Collection in Firestore
   */
  async addUser() {
    const usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, this.user.toJson()).then(async (result) => {
      const docSnap = await getDoc(result);});
  }


  getRandomLightColor() {
    let hue = Math.floor(Math.random() * 360);
    let saturation = Math.floor(Math.random() * 20) + 73;
    let lightness = Math.floor(Math.random() * 30) + 63;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }


  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}













  // try {
  // }
  // catch (error: any) {
  //   if (error.code == "auth/invalid-email") {
  //     alert("The email address is not valid.");
  //   } else if (error.code == "auth/operation-not-allowed") {
  //     alert("Operation not allowed.");
  //   } else if (error.code == "auth/weak-password") {
  //     alert("The password is too weak.");
  //   }
  // }