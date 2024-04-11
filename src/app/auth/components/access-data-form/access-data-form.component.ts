import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { UserAccessData } from 'src/app/core/models/user.model';
import { eyeOffOutline, eyeOutline, flag, lockClosed, logInOutline, mail, personAddOutline } from 'ionicons/icons';
import { MyFormResponse } from 'src/app/core/models/form.model';
import { MyStatus } from 'src/app/core/models/status.model';

@Component({
  selector: 'app-access-data-form',
  templateUrl: './access-data-form.component.html',
  styleUrls: ['./access-data-form.component.scss'],
})
export class AccessDataFormComponent  implements OnInit {

  @Input() isLogin! : boolean;
  @Output() submitDataEventEmitter : EventEmitter<MyFormResponse<UserAccessData>>;

  public principalButtonText : string;
  public principalButtonIconName : string;

  public secondaryButtonText : string;
  public secondaryButtonIconName : string;

  public loginForm : FormGroup;
  public showPassword : boolean;
  public showRePassword : boolean;

  constructor() 
  { 
    this.showPassword = false;
    this.showRePassword = false;

    this.principalButtonText = '';
    this.principalButtonIconName = '';
    
    this.secondaryButtonIconName = ''
    this.secondaryButtonText = '';

    addIcons({mail, lockClosed, eyeOutline, eyeOffOutline, logInOutline, personAddOutline});

    this.loginForm = inject(FormBuilder).group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      rePassword: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
    })
    
    this.submitDataEventEmitter = new EventEmitter<MyFormResponse<UserAccessData>>();
  }

  ngOnInit(): void 
  {
    this.changeFormState(this.isLogin)
  }

  private changeButtonsText(isLogin : boolean)
  {
    if(this.isLogin)
    {
      this.principalButtonIconName = 'log-in-outline';
      this.principalButtonText = 'Log In';
      
      this.secondaryButtonIconName = 'person-add-outline'
      this.secondaryButtonText = 'Register';
    }
    else
    {
      this.principalButtonIconName = 'person-add-outline'
      this.principalButtonText = 'Register';

      this.secondaryButtonIconName = 'log-in-outline';
      this.secondaryButtonText = 'Log In';
    }
  }

  public changeFormState(isLogin : boolean)
  {
    this.isLogin = isLogin;
    this.changeButtonsText(isLogin);
  }

  private validateData() : MyStatus
  {
    const formStatus : MyStatus = 
    {
      header: 'DATOS INVALIDO',
      message: 'Los datos ingresados NO cumplen con las condiciones',
      success: this.loginForm.controls['email'].valid && this.loginForm.controls['password'].valid,
    };

    if(formStatus.success)
    {
      formStatus.header = 'EXITO';
      formStatus.message = 'Los datos ingresados cumplen con los requisitos'

      if(!this.isLogin)
      {
        formStatus.success = this.loginForm.controls['rePassword'].valid;
        
        if(formStatus.success)
        {
          formStatus.success = this.loginForm.controls['rePassword'].value === this.loginForm.controls['password'].value;
          
          if(!formStatus.success)
          {
            formStatus.header = 'CLAVES DISTINTAS';
            formStatus.message = 'Las 2 claves ingresadas TIENES que ser iguales'
          }
        }
      }
    }

    return formStatus;
  }

  public submitData()
  {
    const userAccessData : MyFormResponse<UserAccessData> = {} as MyFormResponse<UserAccessData>;

    userAccessData.status = this.validateData();
    userAccessData.data = this.loginForm.value;
    userAccessData.data.isLogin = this.isLogin;

    this.submitDataEventEmitter.emit(userAccessData);
  }

}
