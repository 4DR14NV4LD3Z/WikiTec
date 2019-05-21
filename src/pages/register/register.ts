import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { FormGroup, Validators, FormBuilder} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
  /**
   * @name form
   * @type {FormGroup}
   * @public
   * @description Define FormGroup for managing form validation
   */
  public form                   :FormGroup;

  /**
   * @name userName
   * @type {Any}
   * @public
   * @description     Model for managing userName field
   */
  public userName               : any;

  /**
   * @name userSurnames
   * @type {Any}
   * @public
   * @description     Model for managing userSurnames field
   */
  public userSurnames            : any;

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
   * @name userDate
   * @type {Any}
   * @public
   * @description     Model for managing userDate field
   */
  public userDate               : any;

  /**
   * @name baseURI
   * @type {String}
   * @public
   * @description     Remote URI for retrieving data from and sending data to
   */
  private baseURI               : string  = "http://127.0.0.1/AVSYSTEMS/scripts/";

  /**
   * @name hideForm
   * @type {Boolean}
   * @public
   * @description     Flag to hide the form upon successful completion of remote operation
   */
  public hideForm               : boolean = false;

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

  /**
   * @name recordID
   * @type {String}
   * @public
   * @description     Property to store the recordID for when an existing entry is being edited
   */
  public recordID               : any      = null;

  constructor(public navCtrl    : NavController,
              public http       : HttpClient,
              public NP         : NavParams,
              public fb         : FormBuilder,
              public toastCtrl  : ToastController) {

    this.form = fb.group({
      "name"                    : ["", Validators.required],
      "surnames"                : ["", Validators.required],
      "email"                   : ["", Validators.required],
      "date"                    : ["", Validators.required],
      "password"                : ["", Validators.required]
    });
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
  /**
   * Assign the navigation retrieved data to properties
   * used as models on the page's HTML form
   *
   * @public
   * @method selectEntry
   * @param item 		{any} 			Navigation data
   * @return {None}
   */
  selectEntry(item : any) : void
  {
    this.userName         = item.name;
    this.userSurnames     = item.surnames;
    this.userEmail        = item.email;
    this.userDate         = item.date;
    this.userPass         = item.password;
    this.recordID         = item.id;
  }

  ionViewWillEnter() : void
  {
    this.resetFields();

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
  saveEntry() : void
  {
    let name          : string = this.form.controls["name"].value,
        surname       : string = this.form.controls["surnames"].value,
        email         : string = this.form.controls["email"].value,
        date          : string = this.form.controls["date"].value,
        password      : string = this.form.controls["password"].value;

    this.createEntry(name, surname, email, password, date);

  }
  resetFields() : void
  {
    this.userName         = "";
    this.userSurnames     = "";
    this.userEmail        = "";
    this.userDate         = "";
  }

  createEntry(name  : string, surname : string, email : string, password  : string,  date : string)  : void
  {
    let headers : any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options : any		= { "key" : "create", "name" : name, "surnames" : surname, "email" : email, "password" : password, "date" : date },
        url     : any      	= this.baseURI + "manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
        .subscribe((data : any) =>
            {
              // If the request was successful notify the user
              this.hideForm   = true;
              this.sendNotification(`Congratulations the technology: ${name} was successfully added`);
            },
            (error : any) =>
            {
              this.sendNotification('Something went wrong!');
            });
  }

  /**
   * Manage notifying the user of the outcome of remote operations
   *
   * @public
   * @method sendNotification
   * @param message 	{String} 			Message to be displayed in the notification
   * @return {None}
   */
  sendNotification(message : string)  : void
  {
    let notification = this.toastCtrl.create({
      message       : message,
      duration      : 3000
    });
    notification.present();
  }


}
