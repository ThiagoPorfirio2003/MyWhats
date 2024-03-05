import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
      password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
      rePassword: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
      realName: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(40), Validators.pattern("[a-zA-Z ]*"), this.hayEspacioInicial]],
      surname: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(40), Validators.pattern("[a-zA-Z ]*"), this.hayEspacioInicial]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern("^[a-zA-Z0-9_]*$")]]
    })
  }

  public showOrHidePassword()
  {
    this.showPassword = !this.showPassword;
  }
  
  private hayEspacioInicial(control: AbstractControl) : null | object
  {
    const valor = <string>control.value;

    if(valor[0] === ' ')
    {
      return {hayEspacioInicial : true};
    }
    else
    {
      return null
    }
  }

  mostrarErrores()
  {
    console.log(this.form.controls['realName']);

    console.log('hayEspacioInicial')
    console.log(this.form.controls['realName'].errors!['hayEspacioInicial']? true : false)
    console.log(this.form.controls['realName'].errors!['hayEspacioInicial']);
  }
  

}
