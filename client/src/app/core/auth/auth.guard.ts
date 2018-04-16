import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userProfileService: AuthService,
    private router: Router
  ) { }

  canLoad(route: Route) {
    if (this.userProfileService.getStatus()) {
      return true;
    }
    const url = `/${route.path}`;
    this.router.navigate(['/form'], { queryParams: { redirectTo: url } });
    return this.userProfileService.getStatus();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userProfileService.getStatus()) {
      return true;
    }
    return false;
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.canActivate(route, state);
  }
}
