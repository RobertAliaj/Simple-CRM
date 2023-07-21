import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { deleteUser, getAuth, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private auth: Auth, private router: Router) {
  }


  resetPassword(email: string) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
      })
      .catch((error) => {
      });
  }


  deleteLoggedInUser() {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      deleteUser(currentUser).then(() => {
        this.signOut();
        this.router.navigate(['login']);
      });
    }
  }


  getCurrentLoggedInEmail() {
    return new Promise((resolve) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user.email);
        }
      });
    });
  }


  async signUp(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }


  async signIn(email: string, password: string) {
    try {
      // try to log in
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      // If theres no error, return the result
      return { user: result.user, error: null };
    }
    catch (error: any) {
      // if there's an error, return the error
      return { user: null, error: error };
    }
  }


  async signOut() {
    return this.afAuth.signOut();
  }
}