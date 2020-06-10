import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifEmailPageRoutingModule } from './verif-email-routing.module';

import { VerifEmailPage } from './verif-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifEmailPageRoutingModule
  ],
  declarations: [VerifEmailPage]
})
export class VerifEmailPageModule {}
