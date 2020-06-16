import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../shared/user.interface";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  user$: Observable<User> = this._auth.afAuth.user;

  constructor(
    private formBuilder: FormBuilder,
    private _auth: AuthService,
    private router: Router
  ) {}

  //--------------------------------------------------------
  loginForm = this.formBuilder.group({
    userEmail: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
      ],
    ],
    userPassword: [
      "",
      [Validators.required, Validators.maxLength(12), Validators.minLength(6)],
    ],
  });
  //--------------------------------------------------------
  get email() {
    return this.loginForm.get("userEmail");
  }

  get password() {
    return this.loginForm.get("userPassword");
  }
  //--------------------------------------------------------
  ngOnInit() {}
  //--------------------------------------------------------
  getErrorPassword() {
    return this.password.hasError("required")
      ? "Debe ingresar una contraseña"
      : this.password.hasError("maxlength")
      ? "Máximo 12 Caracteres"
      : this.password.hasError("minlength")
      ? "Mínimo 6 Caracteres"
      : "";
  }
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
  async loginUsuario() {
    //--> Envio de Datos del Formulario
    const datosForm = this.loginForm.value;
    const email = datosForm.userEmail;
    const pass = datosForm.userPassword;
    //console.log(this.loginForm.value);
    try {
      const user = await this._auth.login(email, pass);
      if (user) {
        //---> Check Email
        const isVerificado = this._auth.isEmailVerified(user);
        console.log("LOG ", isVerificado);
        this.redirectUser(isVerificado);
      }
    } catch (err) {
      console.log("ERROR ", err);
    }
  }
  //--------------------------------------------------------
  async onLoginGoogle() {
    try {
      const user = await this._auth.loginGoogle();
      if (user) {
        //--> Chech Email
        const isVerificado = this._auth.isEmailVerified(user);
        console.log("LOG ", isVerificado);
        this.redirectUser(isVerificado);
      }
    } catch (err) {
      console.log("ERROR ", err);
    }
  }
  //--------------------------------------------------------
  private redirectUser(isVerificado: boolean): void {
    if (isVerificado) {
      this.router.navigate(["pelis"]);
      this.loginForm.controls["userEmail"].setValue("");
      this.loginForm.controls["userPassword"].setValue("");
    } else {
      this.router.navigate(["verif-email"]);
    }
  }
  //--------------------------------------------------------
  onRegistro() {
    this.router.navigate(["register"]);
  }
  //--------------------------------------------------------
}
