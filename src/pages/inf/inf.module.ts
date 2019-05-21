import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfPage } from './inf';

@NgModule({
  declarations: [
    InfPage,
  ],
  imports: [
    IonicPageModule.forChild(InfPage),
  ],
})
export class InfPageModule {}
