import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { addIcons } from 'ionicons';
import {mail,lockClosed, eyeOutline, eyeOffOutline, magnetSharp, logInOutline, personAddOutline} from 'ionicons/icons/index'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent, ReactiveFormsModule, RouterLink]
})
export class LoginPage{// implements OnInit {

  public form : FormGroup;
  public showPassword : boolean;

  constructor() 
  { 
    addIcons({mail,lockClosed, eyeOutline, eyeOffOutline, magnetSharp, logInOutline, personAddOutline});

    this.showPassword = false;

    this.form = inject(FormBuilder).group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  public showOrHidePassword()
  {
    this.showPassword = !this.showPassword;
  }

  mostrarErrores()
  {

  }


}
