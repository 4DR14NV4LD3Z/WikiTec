import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";




/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  /**
   * @name baseURI
   * @type {String}
   * @public
   * @description     Remote URI for retrieving data from and sending data to
   */
  private baseURI               : string  = "http://adrianvaldezvega.000webhostapp.com/scripts/";

  /**
   * @name form
   * @type {FormGroup}
   * @public
   * @description Define FormGroup for managing form validation
   */
  public form                   :FormGroup;

  /**
   * @name userPass
   * @type {Any}
   * @public
   * @description     Model for managing userPass field
   */
  public userPass              : any;

  /**
   * @name userEmail
   * @type {Any}
   * @public
   * @description     Model for managing userEmail field
   */
  public userEmail              : any;

  /**
   * @name isEdited
   * @type {Boolean}
   * @public
   * @description     Flag to be used for checking whether we are adding/editing an entry
   */
  public isEdited               : boolean = false;

  /**
   * @name pageTitle
   * @type {String}
   * @public
   * @description     Property to help set the page title
   */
  public pageTitle              : string;


  constructor(public navCtrl    : NavController,
              public http       : HttpClient,
              public NP         : NavParams,
              public fb         : FormBuilder,
              public toastCtrl  : ToastController
              ) {
    this.form = fb.group({
      "email"                   : ["", Validators.required],
      "password"                : [""]
    });
  }
  doLogin() {
    this.navCtrl.setRoot('MenuPage');
  }

  public eyes = 'eye';
  public showPass = false;
  public type = 'password';

  showHide() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
      this.eyes = 'eye-off';
    } else if (this.type = 'text') {
      this.type = 'password';
      this.eyes = 'eye';
    }
  }
  register(){
    this.navCtrl.push(RegisterPage);
  }
  selectEntry(item : any) : void
  {
    this.userEmail        = item.email;
    this.userPass         = item.password;
  }

  login(){
    let email         : string = this.form.controls["email"].value,
        password      : string = this.form.controls["password"].value;

    this.createLogin(email, password);
  }
  createLogin(email : string, password  : string)  : void
  {
    let headers : any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options : any		= { "key" : "login", "email" : email, "password" : password},
        url     : any      	= this.baseURI + "manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
        .subscribe((data : any) =>
            {
              // If the request was successful notify the user
              this.sendNotification('Acceso correcto');
              this.doLogin();
            },
            (error : any) =>
            {
              this.sendNotification('Usuario o contraseña incorrecta');
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


  ionViewWillEnter() : void
  {

    if(this.NP.get("record"))
    {
      this.isEdited      = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle     = 'Amend entry';
    }
    else
    {
      this.isEdited      = false;
      this.pageTitle     = 'Create entry';
    }
  }


}
