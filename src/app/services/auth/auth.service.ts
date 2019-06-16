import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {}

  isAuthenticated() {
    return this.afAuth.user.pipe(first()).toPromise();
  }

  login({email, password}) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
