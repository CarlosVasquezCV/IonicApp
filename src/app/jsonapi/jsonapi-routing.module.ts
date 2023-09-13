import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JsonapiPage } from './jsonapi.page';

const routes: Routes = [
  {
    path: '',
    component: JsonapiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JsonapiPageRoutingModule {}
