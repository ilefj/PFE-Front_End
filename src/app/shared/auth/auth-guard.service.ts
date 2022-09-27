import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(route, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getRole();
      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        this.router.navigate(['/accueil']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/accueil']);
    return false;
  }
}
