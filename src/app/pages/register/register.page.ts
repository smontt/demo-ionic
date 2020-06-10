import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _auth: AuthService,
    private router: Router
  ) {}

  //--------------------------------------------------------
  registerForm = this.formBuilder.group({
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
    return this.registerForm.get("userEmail");
  }

  get password() {
    return this.registerForm.get("userPassword");
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
  async onRegister() {
    //--> Envio de Datos del Formulario
    const datosForm = this.registerForm.value;
    const email = datosForm.userEmail;
    const pass = datosForm.userPassword;
    //console.log(this.registerForm.value);
    try {
      const user = await this._auth.register(email, pass);
      if (user) {
        //console.log("Usuario ", user);
        this.router.navigate(["verif-email"]);
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  }
  //--------------------------------------------------------
}
