import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { MyOutPutData } from 'src/app/core/models/outPutInfo.model';
import { UserAccessData } from 'src/app/core/models/user.model';
import { eyeOffOutline, eyeOutline, lockClosed, logInOutline, mail, personAddOutline } from 'ionicons/icons';

@Component({
  selector: 'app-access-data-form',
  templateUrl: './access-data-form.component.html',
  styleUrls: ['./access-data-form.component.scss'],
})
export class AccessDataFormComponent  implements OnInit {

  @Input() isLogin! : boolean;
  @Output() submitDataEventEmitter : EventEmitter<MyOutPutData<UserAccessData>>;

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
    
    this.submitDataEventEmitter = new EventEmitter<MyOutPutData<UserAccessData>>();
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

  public submitData()
  {
    let userAccessData : MyOutPutData<UserAccessData>;
    let isDataValid : boolean;
    
    userAccessData = {} as MyOutPutData<UserAccessData>;
    isDataValid = this.loginForm.controls['email'].valid && this.loginForm.controls['password'].valid;

    userAccessData.message = {header: 'EXITO', content: 'Los datos ingresados cumplen con los requisitos'};

    if(isDataValid)
    {
      if(!this.isLogin)
      {
        isDataValid = this.loginForm.controls['rePassword'].valid;

        if(isDataValid)
        {
          isDataValid = this.loginForm.controls['rePassword'].value === this.loginForm.controls['password'].value;

          if(!isDataValid)
          {
            userAccessData.message.header = 'CLAVES DISTINTAS';
            userAccessData.message.content = 'Las 2 claves ingresadas TIENES que ser iguales'
          }
        }
        else
        {
          userAccessData.message.header = 'DATOS INVALIDOS';
          userAccessData.message.content = 'Los datos ingresados NO cumplen con las condiciones'
        }
      }
    }
    else
    {
      userAccessData.message.header = 'DATOS INVALIDOS';
      userAccessData.message.content = 'Los datos ingresados NO cumplen con las condiciones'
    }

    userAccessData.data = this.loginForm.value;
    userAccessData.data.isLogin = this.isLogin;
    userAccessData.dataIsValid = isDataValid;

    this.submitDataEventEmitter.emit(userAccessData);
  }

}
