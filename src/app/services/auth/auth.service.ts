import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { ErrorToastService } from '../error-toast/error-toast.service';
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(public afAuth: AngularFireAuth, public errorToast: ErrorToastService) {}

	$user() {
		return this.afAuth.user;
	}

	isAuthenticated() {
		return this.afAuth.user
			.pipe(first())
			.toPromise()
			.catch(this.emitError);
	}

	login({ email, password }) {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(this.emitError);
	}

	logout() {
		return this.afAuth.auth.signOut().catch(this.emitError);
	}

	emitError(error) {
		this.errorToast.show(error);
	}
}
