import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let AuthServiceMock;
  let RouterMock;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
      ]
    });
  });

  describe('When the user is logged in', () => {
    AuthServiceMock = {isAuthenticated: jest.fn().mockReturnValue(Promise.resolve())};
    RouterMock = { navigate: jest.fn() };
    authGuard = new AuthGuard(AuthServiceMock, RouterMock);

    it('should return true allowing the access', () => {
      expect(authGuard.router.navigate).not.toHaveBeenCalled()
      expect(authGuard.canActivate()).toBeTruthy();
    });
  })

  describe('When the user isn\'t logged in', () => {
    AuthServiceMock = {isAuthenticated: jest.fn().mockReturnValue(Promise.resolve(false))};
    RouterMock = { navigate: jest.fn() };
    authGuard = new AuthGuard(AuthServiceMock, RouterMock);

    it('should redirect to login page', () => {
      expect(authGuard.router.navigate).toHaveBeenCalledWith(['/login'])
    });
  })

});
