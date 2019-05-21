import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import {HttpClient, HttpHeaders} from "@angular/common/http";

/**
 * Generated class for the Tab1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {
  titles: any[] = [
    {"titulo": "División de Estudios", "top" : "top: 50px", "ID" : "1"},
    {"titulo": "Servicio Social", "top" : "top: 190px", "ID" : "2"},
    {"titulo": "Titulación", "top" : "top: 320px", "ID" : "3"},
    {"titulo": "Certificados", "top" : "top: 450px", "ID" : "4"},
    {"titulo": "Competencias Profesionales", "top" : "top: 600px", "ID" : "5"},
    {"titulo": "Residencias", "top" : "top: 750px", "ID" : "6"}
  ]

    /**
     * @name baseURI
     * @type {String}
     * @public
     * @description     Remote URI for retrieving data from and sending data to
     */
    private baseURI               : string  = "https://adrianvaldezvega.000webhostapp.com/scripts/";


  constructor(public navCtrl    : NavController,
              public navParams  : NavParams,
              public http       : HttpClient,
              public toastCtrl  : ToastController) {
  }

  goPage(title):void{
    this.navCtrl.push('DocsPage', {'title': title});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab1Page');
  }

    createEntry(name  : string, surname : string, email : string, password  : string,  date : string)  : void
    {
        let headers : any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options : any		= { "key" : "create", "id_dep" : this.titles, "surnames" : surname, "email" : email, "password" : password, "date" : date },
            url     : any      	= this.baseURI + "manage-data.php";

        this.http.post(url, JSON.stringify(options), headers)
            .subscribe((data : any) =>
                {
                    // If the request was successful notify the user
                    this.sendNotification(`Congratulations the technology: ${name} was successfully added`);
                },
                (error : any) =>
                {
                    this.sendNotification('Something went wrong!');
                });
    }
    sendNotification(message : string)  : void
    {
        let notification = this.toastCtrl.create({
            message       : message,
            duration      : 3000
        });
        notification.present();
    }
}
