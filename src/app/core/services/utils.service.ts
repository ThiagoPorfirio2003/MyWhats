import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController, SpinnerTypes } from '@ionic/angular';
import { MyMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastController : ToastController, 
    private alertController : AlertController,
    private loadingController : LoadingController) { }

  public getToast(message : MyMessage, duration : number, 
    position? : "top" | "bottom" | "middle" | undefined,
    cssClass?: string | string[] | undefined)
  {
    return this.toastController.create(
      {
        header: message.header,
        message: message.content,
        duration: duration,
        position: position,
        cssClass: cssClass,
      }
    )
  }

  public showToast(message : MyMessage, duration : number, 
    position? : "top" | "bottom" | "middle" | undefined,
    cssClass?: string | string[] | undefined)
  {
    this.getToast(message, duration, position, cssClass)
    .then((toast)=> toast.present())
  }

  public getAlert(message : MyMessage,
    cssClass?: string | string[] | undefined)
  {
    return this.alertController.create(
      {
        header: message.header,
        message: message.content,
        cssClass: cssClass,
        buttons: ['Ok']
      }
    )
  }
   
  public showAlert(message : MyMessage,
    cssClass?: string | string[] | undefined)
  {
    this.getAlert(message, cssClass)
    .then((ale)=> ale.present())
  }

  /*
  public async showAlert() 
  {
    
    const alert = await this.alertController.create({
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      buttons: ['Action'],
    });

    await alert.present();
  }
  */

  public getLoadingCtrl(spinnerName : SpinnerTypes, message? : string, duration? : number, cssClass? : string)
  {
    return this.loadingController.create(
    {
      spinner: spinnerName,
      duration: duration,
      message: message,
      cssClass: cssClass,
    }
    )
  }
}
