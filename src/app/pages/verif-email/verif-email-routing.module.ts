import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifEmailPage } from './verif-email.page';

const routes: Routes = [
  {
    path: '',
    component: VerifEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifEmailPageRoutingModule {}
