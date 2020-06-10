import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { take, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class InicioGuard implements CanActivate {
  constructor(private _auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._auth.user$.pipe(
      take(1),
      map((user) => {
        if (user) {
          this.router.navigate(["/pelis"]);
          return true;
        } else {
          return true;
        }
      })
    );
  }
}
