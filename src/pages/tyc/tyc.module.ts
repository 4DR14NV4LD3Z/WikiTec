import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TycPage } from './tyc';

@NgModule({
  declarations: [
    TycPage,
  ],
  imports: [
    IonicPageModule.forChild(TycPage),
  ],
})
export class TycPageModule {}
