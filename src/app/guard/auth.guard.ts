import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router){}

  redirectToLogin(){
    return this.router.navigate(['/login']);
  }
  canActivate(): Promise<boolean>{
    return this.auth.isAuthenticated()
      .then(user => {
        if(!user) return this.redirectToLogin();
        return !!user
      })
      .catch(() => this.redirectToLogin())
  }
}
