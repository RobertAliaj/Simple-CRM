import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private auth: Auth) {
  }


  getAuthState(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const unsubscribe = onAuthStateChanged(this.auth, user => {
        if (user) {
          observer.next(true);
        } else {
          observer.next(false);
        }
      });

      // Gibt eine Aufräumfunktion zurück, die den Beobachter abmeldet, wenn er nicht mehr benötigt wird
      return unsubscribe;
    });
  }


  // checkIfUserIsLoggedIn() {
  //   return new Promise((resolve, reject) => {
  //     onAuthStateChanged(this.auth, (user) => {
  //       if (user) {
  //         resolve(true);
  //       } else {
  //         resolve(false);
  //       }
  //     }, reject);
  //   });
  // }


  async signUp(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }


  async signIn(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }


  async signOut() {
    return this.afAuth.signOut();
  }
}