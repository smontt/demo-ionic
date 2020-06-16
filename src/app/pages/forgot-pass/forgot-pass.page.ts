import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgot-pass",
  templateUrl: "./forgot-pass.page.html",
  styleUrls: ["./forgot-pass.page.scss"],
})
export class ForgotPassPage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _auth: AuthService,
    private router: Router
  ) {}

  //--------------------------------------------------------
  passForm = this.formBuilder.group({
    userEmail: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
      ],
    ],
  });
  //--------------------------------------------------------
  get email() {
    return this.passForm.get("userEmail");
  }
  //--------------------------------------------------------

  ngOnInit() {}

  //--------------------------------------------------------
  getErrorMessage() {
    return this.email.hasError("required")
      ? "Debe ingresar una cuenta de correo"
      : this.email.hasError("email")
      ? "No es un email valido"
      : this.email.hasError("pattern")
      ? "No es un email valido"
      : "";
  }
  //--------------------------------------------------------
  async resetPass() {
    const datosForm = this.passForm.value;
    const email = datosForm.userEmail;
    //console.log(this.passForm.value);
    try {
      await this._auth.resetPassword(email);
      this.router.navigate(["/home"]);
    } catch (err) {
      console.log("ERROR ", err);
    }
  }
}
