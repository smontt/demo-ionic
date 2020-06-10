import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ForgotPassPageRoutingModule } from "./forgot-pass-routing.module";

import { ForgotPassPage } from "./forgot-pass.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ForgotPassPageRoutingModule,
  ],
  declarations: [ForgotPassPage],
})
export class ForgotPassPageModule {}
