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


  resetPassword(email: string){
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch ((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
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
    // versuche mich einzuloggen
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    // wenn es kein Fehler ist, dann gib das Resultat zurück
    return { user: result.user, error: null };
  } catch (error: any) {
    // wenn ein Fehler auftritt, dann gib den Fehler zurück
    return { user: null, error: error };
  }
}

  // async signIn(email: string, password: string) {
  //     return await this.afAuth.signInWithEmailAndPassword(email, password);
  // }


  async signOut() {
  return this.afAuth.signOut();
}
}







// getAuthState(): Observable < boolean > {
//   return new Observable<boolean>(observer => {
//     const unsubscribe = onAuthStateChanged(this.auth, user => {
//       if (user) {
//         observer.next(true);
//       } else {
//         observer.next(false);
//       }
//     });

//     // Gibt eine Aufräumfunktion zurück, die den Beobachter abmeldet, wenn er nicht mehr benötigt wird
//     return unsubscribe;
//   });
// }