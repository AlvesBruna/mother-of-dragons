import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { of, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

class AngularFireAuthMock {
  user = of('user');
  auth = {
    signInWithEmailAndPassword: jest.fn().mockReturnValue(Promise.resolve('ok')),
    signOut: jest.fn().mockReturnValue(Promise.resolve('ok'))
  }
}

class AngularFireAuthErrorMock {
  user = throwError('user error');
  auth = {
    signInWithEmailAndPassword: jest.fn().mockRejectedValue('signIn error'),
    signOut: jest.fn().mockRejectedValue('signOut error')
  }
}
describe('AuthService', () => {
  describe('Success', () => {
    beforeEach(() => TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useClass: AngularFireAuthMock }
      ]
    }));
  
    it('should be created', () => {
      const service: AuthService = TestBed.get(AuthService);
      expect(service).toBeTruthy();
    });
  
    it('isAuthenticated should return the user authenticated', () => {
      const service: AuthService = TestBed.get(AuthService);
      service.isAuthenticated().then(user => {
        expect(user).toBe('user');
      })
    });

    it('logout should invoke signOut function', () => {
      const service: AuthService = TestBed.get(AuthService);
      service.logout().then(result => {
        expect(result).toBeTruthy();
        expect(service.afAuth.auth.signOut).toHaveBeenCalled()
      })
    });

    it('login should invoke signInWithEmailAndPassword function', () => {
      const user = {email: 'name@email.com', password: 123}
      const service: AuthService = TestBed.get(AuthService);
      service.login(user).then(result => {
        expect(result).toBeTruthy();
        expect(service.afAuth.auth.signInWithEmailAndPassword).toHaveBeenCalled()
      })
    });
  })

  describe('Error', () => {
    beforeEach(() => TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useClass: AngularFireAuthErrorMock }
      ]
    }));

    it('isAuthenticated should return error when the user dont\'t exist', () => {
      const service: AuthService = TestBed.get(AuthService);
      service.isAuthenticated().catch(error => {
        expect(error).toBe('user error');
      })
    });

    it('login should invoke signInWithEmailAndPassword function and return error', () => {
      const user = {email: '', password: 123}
      const service: AuthService = TestBed.get(AuthService);
      service.login(user).catch(error => {
        expect(error).toBe('signIn error');
        expect(service.afAuth.auth.signInWithEmailAndPassword).toHaveBeenCalled()
      })
    });

    it('logout should invoke signOut function and return error', () => {
      const service: AuthService = TestBed.get(AuthService);
      service.logout().catch(error => {
        expect(error).toBe('signOut error');
        expect(service.afAuth.auth.signOut).toHaveBeenCalled()
      })
    });

  })
});
