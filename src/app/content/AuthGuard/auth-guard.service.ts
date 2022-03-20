import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/Auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private authService: AuthService,
    private _router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> |
    Promise<boolean> | boolean {
    if (this.authService.getToken()) {
      return true;
    }
    // Redirect về trang login
    this._router.navigate(['/login']);

    return false;
  }
}