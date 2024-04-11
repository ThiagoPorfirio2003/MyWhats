import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage {

  constructor(public authService : AuthService) 
  { 
    console.log(JSON.stringify(authService.myUser))
  }

}
