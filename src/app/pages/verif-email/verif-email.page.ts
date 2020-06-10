import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";
import { User } from "src/app/shared/user.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-verif-email",
  templateUrl: "./verif-email.page.html",
  styleUrls: ["./verif-email.page.scss"],
})
export class VerifEmailPage implements OnInit, OnDestroy {
  user$: Observable<User> = this._auth.afAuth.user;

  constructor(private _auth: AuthService, private router: Router) {}

  ngOnInit() {}

  async onSendEmail(): Promise<void> {
    try {
      await this._auth.sendVerificationEmail();
    } catch (err) {
      console.log("ERROR ", err);
    }
  }
  //---------------------
  volverIni() {
    this._auth.logout();
    this.router.navigate(["/home"]);
  }
  //---------------------
  ngOnDestroy() {
    console.log("LOGOUT DESTROY");
    this._auth.logout();
  }
}
