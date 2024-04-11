import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { AlertButton, AlertOptions } from '@ionic/angular';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{
  
  @Input() title! : string;

  constructor(public authService : AuthService, private utilsService : UtilsService) { }

  public signOut()
  {
    this.utilsService.showAlert(
    {
      header : '¿Seguro que quieres cerrar sesion?',
      buttons: 
      [
        {
          text: 'No'
        },
        {
          text: 'Si', handler: ()=>
          {
            this.authService.signOut();
            this.utilsService.changeRoute('/');         
          }
        }
      ]
    })
  }
}
