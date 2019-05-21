import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {InfPage} from "../inf/inf";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { TycPage } from '../tyc/tyc';
/**
 * Generated class for the Tab3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab3',
  templateUrl: 'tab3.html',
})
export class Tab3Page {

  constructor(public navCtrl    : NavController,
              public navParams  : NavParams,
              public http       : HttpClient,
              public toastCtrl  : ToastController) {  
  }
  goInf(){
    this.navCtrl.push('InfPage',{});
  }
  goHelp(){
    this.navCtrl.push('HelpPage',{});
  }
  goTerm(){
    this.navCtrl.push('TycPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab3Page');
  }
  

}
