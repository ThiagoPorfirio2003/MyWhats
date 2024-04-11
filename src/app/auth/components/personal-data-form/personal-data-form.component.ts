import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { saveOutline } from 'ionicons/icons';
import { MyFormResponse } from 'src/app/core/models/form.model';
import { MyStatus } from 'src/app/core/models/status.model';
import { UserPersonalData } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.scss'],
})
export class PersonalDataFormComponent {

  public userPersonalDataForm : FormGroup;
  @Output() submitDataEvetEmiter : EventEmitter<MyFormResponse<UserPersonalData>>;

  constructor() 
  { 
    addIcons({saveOutline});

    this.submitDataEvetEmiter = new EventEmitter<MyFormResponse<UserPersonalData>>();

    this.userPersonalDataForm = inject(FormBuilder).group({
      realName: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(40), Validators.pattern("[a-zA-Z ]*"), this.hayEspacioInicial]],
      surname: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(40), Validators.pattern("[a-zA-Z ]*"), this.hayEspacioInicial]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern("^[a-zA-Z0-9_]*$")]]
    })
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

  public submitData()
  {
    const formStatus : MyFormResponse<UserPersonalData> = {} as MyFormResponse<UserPersonalData>;
    const statusResponse : MyStatus = {header: 'DATOS INVALIDOS', message: 'Los datos ingresados NO cumplen con las condiciones', success: this.userPersonalDataForm.valid};

    formStatus.data = this.userPersonalDataForm.value;
    formStatus.data.image = {path:'', url:''};

    if(statusResponse.success)
    {
      statusResponse.header = 'EXITO'
      statusResponse.message = 'Los datos ingresados cumplen con las condiciones'
    }

    formStatus.status = statusResponse;

    this.submitDataEvetEmiter.emit(formStatus)
  }
}
