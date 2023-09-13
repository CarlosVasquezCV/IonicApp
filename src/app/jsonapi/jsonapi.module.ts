import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JsonapiPageRoutingModule } from './jsonapi-routing.module';

import { JsonapiPage } from './jsonapi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JsonapiPageRoutingModule
  ],
  declarations: [JsonapiPage]
})
export class JsonapiPageModule {}
