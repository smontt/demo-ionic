import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { InicioGuard } from "./guards/inicio.guard";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
    canActivate: [InicioGuard],
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "pelis",
    loadChildren: () =>
      import("./pages/pelis/pelis.module").then((m) => m.PelisPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "peli/:id",
    loadChildren: () =>
      import("./pages/details/details.module").then((m) => m.DetailsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/register/register.module").then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: "verif-email",
    loadChildren: () =>
      import("./pages/verif-email/verif-email.module").then(
        (m) => m.VerifEmailPageModule
      ),
  },
  {
    path: "forgotpass",
    loadChildren: () =>
      import("./pages/forgot-pass/forgot-pass.module").then(
        (m) => m.ForgotPassPageModule
      ),
  },
  {
    path: "**",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
