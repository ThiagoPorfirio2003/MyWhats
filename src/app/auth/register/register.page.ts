import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline, lockClosed, logInOutline, magnetSharp, mail, personAddOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, HeaderComponent, RouterLink]
})
export class RegisterPage 
{
  public form : FormGroup;
  public showPassword : boolean;

  constructor() 
  { 
    addIcons({mail,lockClosed, eyeOutline, eyeOffOutline, magnetSharp, logInOutline, personAddOutline});

    this.showPassword = false;

    this.form = inject(FormBuilder).group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      rePassword: ['', [Validators.required, Validators.minLength(10)]],

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
