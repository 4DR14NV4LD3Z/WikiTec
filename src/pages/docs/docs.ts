import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { DocumentViewer } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

/**
 * Generated class for the DocsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-docs',
  templateUrl: 'docs.html',
})
export class DocsPage {
  /**
   * @name items
   * @type {Array}
   * @public
   * @description     Used to store returned PHP data
   */
  public items : Array<any> = [];

  /**
   * @name pageTitle
   * @type {String}
   * @public
   * @description     Property to help set the page title
   */
  public title              : any[];

  constructor(public    navCtrl    : NavController,
              public    navParams  : NavParams,
              public    http       : HttpClient,
              private   document   : DocumentViewer,
              private   file       : File,
              private   platform   : Platform,
              private   tranfer    : FileTransfer) {
  }
  /**
   * Triggered when template view is about to be entered
   * Returns and parses the PHP data through the load() method
   *
   * @public
   * @method ionViewWillEnter
   * @return {None}
   */
  ionViewWillEnter() : void
  {
    this.load();
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad DocsPage');

    this.title = this.navParams.get('title').titulo;
    console.log(this.title)
  }
  /**
   * Retrieve the JSON encoded data from the remote server
   * Using Angular's Http class and an Observable - then
   * assign this to the items array for rendering to the HTML template
   *
   * @public
   * @method load
   * @return {None}
   */
  load() : void{
    this.http
        .get('https://adrianvaldezvega.000webhostapp.com/scripts/retrieve-data.php?key=create&ID='+this.navParams.get('title').ID)
        .subscribe((data : any) =>
            {
              this.items = data;
              console.dir(data);
            },
            (error  : any)  =>
            {
              console.dir(error);
            }
            )
  }
  
  downloadAndOpenPdf(ruta){
    let path = null;

    if (this.platform.is('ios')){
      path = this.file.documentsDirectory;
    }else {
      path = this.file.dataDirectory;
    }
    console.dir(ruta);
    const tranfer = this.tranfer.create();
    tranfer.download(ruta, path + 'myfile.pdf').then(entry => {  
    let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf', {});
      console.dir(url);
    });
  
  }

}
//'https://adrianvaldezvega.000webhostapp.com/wp-contents/lineamientos/Residencias_Formatos/Solicitud%20de%20Residencia%20Profesional%20rev%201%20(1).pdf'