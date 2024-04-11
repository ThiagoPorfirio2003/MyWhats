import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController, SpinnerTypes, AlertOptions, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastController : ToastController, 
    private alertController : AlertController,
    private loadingController : LoadingController,
    private router : Router) { }

  public getToast(toastOptions : ToastOptions)
  {
    return this.toastController.create(toastOptions);
  }

  public showToast(toastOptions : ToastOptions)
  {
    this.getToast(toastOptions)
    .then((toast)=> toast.present())
  }

  public getAlert(alertOptions : AlertOptions)
  {
    return this.alertController.create(alertOptions)
  }
   
  public showAlert(alertOptions : AlertOptions)
  {
    this.getAlert(alertOptions)
    .then((ale)=> ale.present())
  }

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

  public changeRoute(newRoute : string)
  {
    this.router.navigate([newRoute]);
  }

  public getRoute()
  {
    return this.router.url;
  }
}
